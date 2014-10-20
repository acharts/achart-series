/**
 * @fileOverview 在x,y坐标轴中渲染的数据序列
 * @ignore
 */


var 
  BaseSeries = require('./base'),
  Util = require('achart-util');

 function date2number(value){
  if(Util.isNumber(value)){
    return value;
  }
  if(Util.isString(value)){
    value = value.replace(/'-'/ig,'/');
    value = new Date(value).getTime();
  }else if(Util.isDate(value)){
    value = value.getTime();
  }
  return value;
}

/**
 * @class Chart.Series.Cartesian
 * 使用坐标轴的数据序列，此类是一个抽象类，不要直接初始化
 *
 *  - <a href="http://spmjs.io/docs/achart-series/#Cartesian" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-series/wiki/02-cartesian.html" target="_blank">wiki</a>
 *  
 * @extends Chart.Series
 */
function Cartesian(cfg){
  Cartesian.superclass.constructor.call(this,cfg);
}

Cartesian.ATTRS = {
   /**
   * 如果横坐标是数字类型，则通过点的间距来决定点
   * @type {Number}
   */
  pointInterval : null,
  /**
   * 如果横坐标是数字类型,点的起始值
   * @type {Number}
   */
  pointStart : 0,
  /**
   * x坐标轴
   * @type {Chart.Axis}
   */
  xAxis : null,
  /**
   * y坐标轴
   * @type {Chart.Axis}
   */
  yAxis : null,

  invert : false,
  
  pointsCache : {}

};

Util.extend(Cartesian,BaseSeries);

Util.augment(Cartesian,{

  //获取代表x的坐标
  getXName : function(){
    var _self = this,
      xName = _self.get('xName');
    if(!xName){
      xName = _self.get('invert') ? 'y' : 'x';
      _self.set('xName',xName);
    }
    return xName;
  },
  //获取代表y的坐标
  getYName : function(){
    var _self = this,
      yName = _self.get('yName');
    if(!yName){
      yName = _self.get('invert') ? 'x' : 'y';
      _self.set('yName',yName);
    }
    return yName;
  },
  /**
   * 获取坐标点
   * @param  {*} x x坐标系上的值
   * @param  {*} y y坐标系上的值
   * @return {Object}  坐标点
   */
  getPoint : function(x,y){
    var _self = this,
      xAxis = _self.get('xAxis'),
      yAxis = _self.get('yAxis'),
      yValue = _self.parseYValue(y),
      xName = _self.getXName(),
      yName = _self.getYName(),
      point = {};

    if(xAxis.get('type') == 'time'){
      x = date2number(x);
    }
    //圆形坐标轴，一般用于雷达图
    if(_self.isInCircle()){
      point = yAxis.getPointByAngle(x,yValue);
    }else{
      point[xName] = xAxis.getOffset(x);
      point[yName] = yAxis.getOffset(yValue);
    }

    Util.mix(point,{
      yValue : yValue,
      xValue : x,
      value : y
    });

    return point;
  },
  //覆写父类方法，改变数据
  changeData : function(data,redraw){
    this.set('pointsCache',{});
    Cartesian.superclass.changeData.call(this,data,redraw);
  },
  /**
   * @protected
   * 传入的数据中是否存在x轴的值，如果不存在则使用index计算
   * @return {Boolean} 
   */
  hasXValueInArray : function(){
    var _self = this,
      xAxis = _self.get('xAxis'),
      type = xAxis.get('type');
    //如果是时间、数字坐标轴，同时设置了点的间距，不需要数组中存在 x值
    if((type == 'number' || type == 'time') && _self.get('pointInterval')){
      return false;
    }
    return true;
  },
  /**
   * @protected
   * 根据指定的值获取点的信息
   * @param  {Number} value 在x轴上的值
   * @return {Object} 点的信息
   */
  getPointByValue : function(xValue,value){

    return this.getPoint(xValue,value);
  },
  /**
   * @protected
   * 转换显示的值，一般用于层叠的数据序列中
   */
  parseYValue : function(value){
    return value;
  },
  /**
   * 执行平铺动画，从左到右，从上到下显示图表序列
   * @param  {Function} fn  执行的函数
   * @param  {Function} callback 回调
   */
  animateClip : function(fn,callback){
    if(Util.svg){
      var _self = this,
        canvas = _self.get('canvas'),
        invert = _self.get('invert'),
        width = canvas.get('width'),
        duration = _self.get('duration'),
        height = canvas.get('height'),
        clip =  invert ? '0,0,' + width + ',0' : '0,0,0,' + height;

      _self.attr('clip-rect',clip);
      fn && fn();
      _self.animate({
        'clip-rect' : '0,0,' + width + ','+height
      },duration,function(){
        callback && callback();
        _self.attr('clip-rect','');
      }); 
    }else{
      callback && callback();
    }
  },
  /**
   * @protected
   * 判断是否近似相等
   */
  snapEqual : function(value1,value2){
    var _self = this;
    
    if(Util.isString(value1)){
      return value1 == value2;
    }
    var pointInterval = _self.get('pointInterval');
    if(pointInterval){
      return Math.abs(value1 - value2) < pointInterval / 2;
    }

    return value1 == value2;
    
  },
  /**
   * 是否使用圆形坐标轴作为x轴
   * @return {Boolean} 
   */
  isInCircle : function(){
    return this.get('xAxis').get('type') == 'circle';
  },
  /**
   * @protected
   * 如果使用圆形坐标轴，则返回中心节点
   */
  getCircleCenter : function(){
    var _self = this,
      xAxis = _self.get('xAxis'),
      rst = null;
    if(xAxis.get('type') == 'circle'){
      rst = xAxis.getCenter();
    }
    return rst;
  },
  getCircle : function(){
    return this.isInCircle() ? this.get('xAxis') : null;
  },
  /**
   * 获取对应坐标轴上的数据，一般用于计算坐标轴
   * @return {Array} 
   */
  getData : function(type){
    var _self = this,
      data = _self.get('data'),
      pointsCache = _self.get('pointsCache'),
      xAxis = _self.get('xAxis'),
      first = data[0],
      rst = [],
      pointStart = _self.get('pointStart');

    type = type || 'yAxis';
    if(pointsCache[type]){
      return pointsCache[type];
    }
    //如果是x轴，并且指定了开始节点
    if(type == 'xAxis' && (pointStart != null &&!(xAxis.get('type') == 'time' && pointStart == 0)) && _self.get('pointInterval') /*&& !(xAxis.get('type') == 'time') && pointStart == 0*/){
      var 
        pointInterval = _self.get('pointInterval');
        rst.push(pointStart);
        rst.push(pointStart + (data.length - 1) * pointInterval);
    }else{ 
      var xField = _self.get('xField'),
        yField = _self.get('yField');
      //遍历所有节点
      Util.each(data,function(item){
        //数字和字符串直接填入
        if(Util.isNumber(item) || Util.isString(item)){
          rst.push(item);
        }else if(Util.isArray(item)){ //数组，0标示x,1标示y
          var value = type == 'yAxis' ? item[1] : item[0];
          rst.push(value);
        }else if(item){ //根据xField,yField取值
          var value = type == 'yAxis' ? item[yField] : item[xField];
          rst.push(value);
        }
      });
    }

    pointsCache[type] = rst;
    return rst;
    
  },
  /**
   * 根据索引获取值
   * @protected
   * @return {Object} 点的集合
   */
  getPointByIndex : function(value,index){
    var _self = this,
      xAxis = _self.get('xAxis'),
      yAxis = _self.get('yAxis'),
      xName = _self.getXName(),
      yName = _self.getYName(),
      x,
      yValue = _self.parseYValue(value),
      y = yAxis.getOffset(yValue),
      originValue,
      xValue,
      point = {};

    if(xAxis.get('type') == 'number' || xAxis.get('type') == 'time'){

      var pointStart = _self.get('pointStart'),
        pointInterval = _self.get('pointInterval');
      x = xAxis.getOffset(pointStart + pointInterval * index);
    }else{
      x = xAxis.getOffsetByIndex(index);
    }

    if(_self.isInCircle()){
      return _self.getPoint(x,value);
    }

    originValue = xAxis.getValue(x);
    if(pointInterval){
      originValue = Util.tryFixed(originValue,pointInterval);
    }

    point[xName] = x;
    point[yName] = y;

    return Util.mix(point,{
      xValue : originValue,
      yValue : yValue,
      value : value
    });
  },
  /**
   * 获取鼠标移动与该series的焦点
   */
  getTrackingInfo : function(point){
    var _self = this,
      xAxis = _self.get('xAxis'),
      xName = _self.getXName(),
      xValue;

    if(_self.isInCircle()){
      var angle = xAxis.getCircleAngle(point.x,point.y);

      xValue = xAxis.getValue(angle);
    }else{
      xValue = xAxis.getValue(point[xName]);
    }
    return _self.findPointByValue(xValue);
  },
  /**
   * 获取最底层的点的值
   * @return {Number} 最底层点的值
   */
  getBaseValue : function(){
    var _self = this,
      yAxis = _self.get('yAxis'),
      value0 = yAxis.getOffset(0) || yAxis.getStartOffset();
    return value0;
  }

});

module.exports = Cartesian;
