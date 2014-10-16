/**
 * @fileOverview 区域图序列
 * @ignore
 */


var 
  Line = require('./line'),
  Util = require('achart-util'),
  Stacked = require('./stacked'),
  REGEX_MOVE = /^M.*(M).*$/;

function trySet(obj,name,value){
  if(obj && !obj[name]){
    obj[name] = value;
  }
}

function pathStr(CMD,x,y,invert){
  if(invert){
    return CMD + y + ' ' + x;
  }
  return CMD + x + ' ' + y;
}

function pathArray(arr,invert){
  if(invert){
    var tmp = arr[1];
    arr[1] = arr[2];
    arr[2] = tmp;
  }
  return arr;
}
/**
 * @class Chart.Series.Area
 * 区域图的数据序列
 *
 *  - <a href="http://spmjs.io/docs/achart-series/#area" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-series/wiki/04-area.html" target="_blank">wiki</a>
 *  
 * @extends Chart.Series.Line
 */
var Area = function(cfg){
  Area.superclass.constructor.call(this,cfg);
};

Area.ATTRS = {
  elCls : 'x-chart-area-series',
  /**
   * 区域的配置信息
   * @type {Object}
   */
  area : {
    stroke : '',
    'fill-opacity' : '0.70'
  }

};

Util.extend(Area,Line);
Util.mixin(Area,[Stacked]);

Util.augment(Area,{
  processColor : function(){
    Area.superclass.processColor.call(this);
    var _self = this,
      color = _self.get('color'),
      area = _self.get('area');

    trySet(area,'fill',color);
  },
  renderUI : function(){
    Area.superclass.renderUI.call(this);
    var _self = this,
      canvas = _self.get('canvas'),
      markersGroup = _self.get('markersGroup');
    _self.on('afterpaint',function(){
      if(markersGroup && _self.isStacked()){
        canvas.get('node').appendChild(markersGroup.get('node'));  
      }
    });
  },
  //覆盖隐藏方法，同时隐藏markers
  hide : function(){
    Area.superclass.hide.call(this);
    var _self = this,
      markersGroup = _self.get('markersGroup');
    markersGroup && markersGroup.hide();
  },
  //同时显示markers
  show : function(){
    Area.superclass.show.call(this);
    var _self = this,
      markersGroup = _self.get('markersGroup');
    markersGroup && markersGroup.show();
  },
  /**
   * @protected
   * 绘制内部内容
   */
  drawInner : function(points){
    var _self = this,
      areaShape = _self.get('areaShape');
    if(!areaShape){
      _self.drawArea(points);
    }else{
      var path = _self._getAreaPath(points);
      areaShape.attr('path',path);
    }

  },
  _getAreaPath : function(points){
    var _self = this,
      stackType = _self.get('stackType'),
      path;
    if(stackType && stackType != 'none'){
      path = _self.points2StackArea(points);
    }else{
      path = _self.points2area(points);
    }
    return path;
  },
  //坐标轴变化引起的area变化
  changeShapes : function(){
    Area.superclass.changeShapes.call(this);
    var _self = this,
      areaShape = _self.get('areaShape'),
      points = _self.getPoints(),
      path = _self._getAreaPath(points);
    if(_self.get('animate')){
      Util.animPath(areaShape,path);
    }else{
      areaShape.attr('path',path);
    }
  },
  //绘制区域
  drawArea : function(points){
    var _self = this,
      area = _self.get('area'),
      path = _self.isStacked() ? _self.points2StackArea(points) : _self.points2area(points),
      cfg = Util.mix({path :path},area),
      areaShape;


    areaShape = _self.addShape('path',cfg);

    _self.set('areaShape',areaShape);
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
  },
  //获取层叠的区域图，忽略null值
  points2StackArea : function(points){
    var _self = this,
      length = points.length,
      value0 = _self.getBaseValue(),
      first = points[0],
      last = points[length - 1],
      linePath,
      isInCircle = _self.isInCircle(),
      path = '',
      invert = _self.get('invert'), //是否坐标轴旋转
      xName = _self.getXName(),
      yName = _self.getYName(),
      pre;

    if(length){
      pre = _self.getVisiblePrev();
      linePath = _self.points2path(points);
      path = linePath;
      if(pre){
        var prePoints = pre.getPoints().slice(0,points.length),
          preFirst = prePoints[0],
          prePath = _self.points2path(prePoints.reverse());
        //if(!isInCircle){
          prePath = prePath.replace('M','L');
        //}
        if(isInCircle){
          path = linePath + 'L' + preFirst.x + ' '+ preFirst.y + prePath;
        }else{
          path = linePath + prePath;
        }
      }else{
        if(!isInCircle){
          path = pathStr('M ',first[xName], value0,invert)  + linePath.replace('M','L');
          path = path + pathStr('L ',last[xName],value0,invert) +'';
        }

      }
      if(path && !isInCircle){
        path = path + 'z';
      }
    }
    return path;
  },
  //获取第一个非null节点
  _getFirstPoint : function(points){
    var rst = null;
    Util.each(points,function(point){
      if(point.value != null){
        rst = point;
        return false;
      }
    });
    return rst;
  },
  //获取最后一个非null节点
  _getLastPoint : function(points){
    var rst = null;
    for(var i = points.length - 1; i >=0 ; i--){
      var point = points[i];
      if(point.value != null){
        rst = point;
        break;
      }
    }
    return rst;
  },
  //点转换成区域的path
  points2area : function(points){
    var _self = this,
      length = points.length,
      value0 = _self.getBaseValue(),
      first = _self._getFirstPoint(points) || points[0],
      last = _self._getLastPoint(points) || points[length - 1],
      isInCircle = _self.isInCircle(),
      linePath,
      invert = _self.get('invert'), //是否坐标轴旋转
      xName = _self.getXName(),
      yName = _self.getYName(),
      path = '';
   
    if(length){ 
      linePath = _self.points2path(points);
      if(isInCircle){//在雷达图中显示时不考虑缺少点
        var center = _self.getCircleCenter();
        
        path = linePath;

      }else{
        path = pathStr('M',first[xName],value0,invert);

        path = path + linePath.replace('M','L');
        if(REGEX_MOVE.test(path)){
          path = Util.parsePathString(path);
          var temp = [],
            preBreak = path[0];
          Util.each(path,function(item,index){
            if(index !== 0 && item[0] == 'M'){ //如果遇到中断的点，附加2个点
              var n1 = [],
                n0 = [], //vml下 中间的'z'存在bug
                n2 = [],

                preItem = path[index - 1];
              n1[0] = 'L';
              n1[1] = preItem[1];
              n1[2] = value0;

              n0[0] = 'L';
              n0[1] = preBreak[1];
              n0[2] = value0;

              n2[0] = 'M';
              n2[1] = item[1];
              n2[2] = value0;

              if(preItem[0] == 'R'){ //防止2个
                preItem[0] = 'L';
                item[0] = 'R';
              }else{
                item[0] = 'L';
              }
              temp.push(pathArray(n1,invert));
              temp.push(pathArray(n0,invert));
              temp.push(pathArray(n2,invert));
              preBreak = item;
            }
            temp.push(pathArray(item));
            
          });
          path = temp;
          path.push(pathArray(['L',last.x,value0],invert));
          if(Util.svg){
            path.push(['Z'])
          }

        }else{
          path = path + pathStr('L',last[xName],value0,invert) + 'z';
        }
        
      }
      
    }
    
    return path;
  }
});

module.exports = Area;
