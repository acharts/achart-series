/**
 * @fileOverview 柱状图
 * @ignore
 */


var 
  Util = require('achart-util'),
  Cartesian = require('./cartesian'),
  ActiveGroup = require('achart-actived').Group,
  Stacked = require('./stacked'),
  Group = require('./itemgroup');

function highlight(c,percent){
  var color = Raphael.color(c),
    l = color.l * (1 + percent);
  return Raphael.hsl2rgb(color.h,color.s,l).hex;
}

function getPiePath (startAngle, endAngle,r,ir,circle) {
    var center = circle.getCenter(),
      path,
      cx = center.x,
      cy = center.y,
      start = circle.getCirclePoint(startAngle,r),
      end = circle.getCirclePoint(endAngle,r);

    //不存在内部圆
    if(!ir){
      path =  ["M", cx, cy, "L", start.x, start.y, "A", r, r, 0, +(endAngle - startAngle > 180), 1, end.x, end.y, "z"];
    }else{
      var iStart = circle.getCirclePoint(startAngle,ir),
        iEnd = circle.getCirclePoint(endAngle,ir);

      path = [];

      path.push(['M',iStart.x,iStart.y]);
      path.push(['L',start.x, start.y]);
      path.push(["A", r, r, 0, +(endAngle - startAngle > 180), 1, end.x, end.y]);
      path.push(['L',iEnd.x,iEnd.y]);
      path.push(['A',ir,ir,0,+(endAngle - startAngle > 180),0,iStart.x,iStart.y]);
      path.push(['z']);
    }
    return path;
  }

/**
 * @class Chart.Series.Column
 * 柱状图
 * 
 *  - <a href="http://spmjs.io/docs/achart-series/#Column" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-series/wiki/05-column.html" target="_blank">wiki</a>
 *  
 * @extends Chart.Series.Cartesian
 * @mixins Chart.Series.ItemGroup
 */
var Column = function(cfg){
  Column.superclass.constructor.call(this,cfg);
};


Column.ATTRS = {
  
  type : 'column',

  elCls : 'x-chart-column',
  /**
   * 每一个子项的宽度,自动计算得出
   * @type {Number}
   */
  columnWidth : null,
  /**
   * 自动计算得出
   * @type {Object}
   */
  columnOffset : 0,
  /**
   * 是否允许取消选中，选中状态下，继续点击则会取消选中
   * @type {Boolean}
   */
  cancelSelect : false,
  /**
   * 发生层叠时，层叠之间的间距
   * @type {Object}
   */
  stackPadding : 1,
  animate : true,
  duration : 1000,
  
  item : {
    'stroke': 'none',
    'stroke-width': 1,
    'fill-opacity':.75
  }

};

Util.extend(Column,Cartesian);


Util.mixin(Column,[Group,ActiveGroup,Stacked]);


Util.augment(Column,{
  /**
   * @protected
   * 处理颜色
   */
  processColor : function(){
    var _self = this,
      color = _self.get('color');
    if(color){
      var item = _self.get('item');
      if(!item.fill){
        item.fill = color;
      }
    }
  },
  bindUI : function(){
    Column.superclass.bindUI.call(this);
    this.bindItemClick();
  },
  //渲染
  draw : function(points){
    var _self = this;
    _self.resetWidth();

    Util.each(points,function(point,index){
      _self._drawPoint(point,index);
    });
    if(_self.get('animate')){
      _self.animateItems();
    }
    _self.sort();
  },
  _drawPoint : function(point,index){
    var _self = this,
      shape = _self.addItem(point,index);

    if(_self.get('labels')){
      var label = _self.addLabel(point.value,point);
      shape.set('label',label);
    }
  },
  //覆写添加节点的方法
  addPoint : function(point,shift,redraw){
    var _self = this,
      data = _self.get('data');
    data.push(point);
    
    if(shift){
      data.shift();
      redraw &&  _self.shiftPoint();
    }
    _self.changeData(data,redraw);
  },
  shiftPoint : function(){
    var _self = this,
      firstItem = _self.getItems()[0];
    firstItem && firstItem.remove();
    Column.superclass.shiftPoint.call(this);
  },
  //重置宽度
  resetWidth : function(){
    if(this.isInCircle()){
      this.resetCircleWidth();
      return ;
    }
    var _self = this,
      curIndex,
      xAxis = _self.get('xAxis'),
      tickLength = _self._getAvgLength(),
      count,
      margin = 10,
      width,
      offset,
      info = _self._getIndexInfo();

    count = info.count;
    curIndex = info.curIndex;

    width = (tickLength/2)/count;
    margin = 1/2 * width;
    offset = 1/2 * (tickLength - (count) * width - (count - 1) * margin) + ((curIndex + 1) * width + curIndex * margin) - 1/2 * width - 1/2 * tickLength ;
    _self.set('columnWidth',width);
    _self.set('columnOffset',offset)

  },
  _getAvgLength : function(){
    var _self = this,
      xAxis = _self.get('xAxis'),
      type = xAxis.get('type'),
      avgLength,
      data = _self.get('data');

    if(type != 'time' && type != 'number' && type != 'timeCategory'){
      avgLength = xAxis.getTickAvgLength();
    }else{
      var length = xAxis.getLength();
      avgLength = length / data.length;
    }
    return avgLength;
  },
  //获取index相关信息
  _getIndexInfo : function(){
    var _self = this,
      parent = _self.get('parent'),
      series = parent.getSeries ? parent.getSeries() : parent.get('children'),
      curIndex,
      count,
      columns = [];
    if(!_self.isStacked()){
      Util.each(series,function(item){
        if(item.get('visible') && item.get('type') == 'column'){
          columns.push(item);
        }
      });

      count = columns.length;
      curIndex = Util.indexOf(columns,_self);
    }else{
      count = 1;
      curIndex = 0;
    }
    
    return {
      curIndex : curIndex,
      count : count
    };
  },
  //重置圆中的宽度
  resetCircleWidth : function(){
    var _self = this,
      curIndex,
      xAxis = _self.get('xAxis'),
      avgAngle = xAxis.getTickAvgAngle(),
      count,
      width,
      offset;
    info = _self._getIndexInfo();

    count = info.count;
    curIndex = info.curIndex;
    width = avgAngle / count;
    offset = curIndex * width;
    _self.set('columnWidth',width);
    _self.set('columnOffset',offset)
  },
  changeShapes : function(points){
    var _self = this;

    _self.resetWidth();
    _self.changePoints(points);
  },
  getActiveItems : function(){
    return this.getItems();
  },
  /**
   * @protected
   * @ignore
   */
  isItemActived : function(item){
    return item.get('actived');
  },
  /**
   * @protected
   * 设置激活状态
   * @param {Chart.Actived} item 可以被激活的元素
   * @param {Boolean} actived 是否激活
   */
  setItemActived : function(item,actived){
    var _self = this,
      color = item.getCfgAttr('attrs').fill;

    if(actived){
      item.attr('fill',highlight(color,0.2));
      item.set('actived',true);
    }else{
      item.attr('fill',color);
      item.set('actived',false);
    }
  },
  /**
   * @protected
   * 设置选中
   * @param {Object} item  
   * @param {Boolean} selected 选中状态
   */
  setItemSelected : function(item,selected){
    var _self = this,
      attrs = item.getCfgAttr('attrs'),
      color = attrs.fill,
      stroke = attrs.stroke,
      strokeWidth = attrs['stroke-width'];
    if(selected){
      item.attr({'stroke': Util.dark(color,.30),'stroke-width' : 2});
      item.set('selected',true);
    }else{
      item.attr({'stroke': stroke,'stroke-width' : strokeWidth});
      item.set('selected',false);
    }
  },
  /**
   * @protected
   * 鼠标在画布上移动
   */
  onStickyTracking : function(ev){
    var _self = this,
      point = _self.getTrackingInfo(ev.point),
      items = _self.getItems();
    if(point){
      Util.each(items,function(item){
        if(item.get('point').x == point.x && item.get('point').y == point.y){
          _self.setActivedItem(item);
        }
      });
    }
  },
  /**
   * @protected
   * 动画过程中根据比例获取path
   * @param  {Object} point  子项的节点信息
   * @param  {Number} factor 比例
   * @return {Array}  path
   */
  pointToFactorPath : function(point,factor){
    var _self = this,
      item = _self.get('item'),
      width = _self.get('columnWidth'), //宽度,雷达图中表示角度
      offset = _self.get('columnOffset'),
      xName = _self.getXName(),
      yName = _self.getYName(),
      invert = _self.get('invert'), //坐标轴是否旋转
      V = invert ? 'h' : 'v',
      H = invert ? 'v' : 'h',
      height,
      value0,
      stackPadding = 0,
      baseValue =  _self.getBaseValue(),
      isInCircle = _self.isInCircle(),
      path = []; //

    if(isInCircle){ //雷达图中显示
      var xAxis = _self.get('xAxis'),
        angle = point.xValue,//此时xValue指角度
        startAngle = offset + angle, //起始坐标
        endAngle = offset + angle + width,//结束角度
        r = point.r || xAxis.getDistance(point.x,point.y),
        ir = point.ir || 0; 

      r = r * factor;
      ir = ir * factor;
      path = getPiePath(startAngle,endAngle,r,ir,xAxis);

    }else{
      if(_self.isStacked() && point.lowY){
          value0 = point.lowY ;
          stackPadding = _self.get('stackPadding');
      }else{
        value0 = baseValue;
      }
      value0 = value0 - stackPadding;
      height = point[yName] - value0;
      var xValue = point[xName] + offset - width/2,
        yValue = baseValue + (value0 - baseValue) * factor;
      if(invert){
        path.push(['M',yValue,xValue]);
      }else{
        path.push(['M',xValue,yValue]);
      }
      path.push([V,height * factor]);
      path.push([H,width]);
      path.push([V,-1 * height * factor]);
      path.push(['z']);
    }
    

    return path;
  },
  /**
   * @protected
   * 处理节点，并且添加附加信息
   */
  processPoint : function(point,index){
    var _self = this,
      stackType = _self.get('stackType');
    if(stackType && stackType != 'none'){
      _self.processStackedPoint(point,index);
    }
  }

});

module.exports = Column;
