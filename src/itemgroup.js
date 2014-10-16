/**
 * @fileOverview 包含数据序列子项的数据序列类,作为一个扩展可以用于柱状图、饼图
 * @ignore
 */

  
var 
  Base = require('./base'),
   Util = require('achart-util');

function removeLabel(label){
  if(label.remove){
    label.remove();
  }else if(label.parentNode){
    label.parentNode.removeChild(label);
  }
}

/**
 * @class Chart.Series.ItemGroup
 * 包含数据序列子项的数据序列类,作为一个扩展可以用于柱状图、饼图
 * 
 *  - <a href="http://spmjs.io/docs/achart-series/api/itemgroup.html" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-series/wiki/08-itemgroup.html" target="_blank">wiki</a>
 *  
 */
var Group = function(){

  /**
   * @event itemselected
   * 选项激活
   * @param {Object} ev 事件对象
   * @param {Object} ev.item 选中的子项
   */
  

  /**
   * @event itemunselected
   * 选项激活
   * @param {Object} ev 事件对象
   * @param {Object} ev.item 取消选中的子项
   */
};

Group.ATTRS = {
  /**
   * 子项的配置信息
   * @type {Object}
   */
  item : undefined,
  /**
   * 存放子项的容器
   * @type {Chart.Canvas.Group}
   */
  group : null,
  /**
   * 是否允许选中
   * @type {Boolean}
   */
  allowPointSelect : false,
  /**
   * 是否允许取消选中，选中状态下，继续点击则会取消选中
   * @type {Boolean}
   */
  cancelSelect : true
}

Util.extend(Group,Base);

Util.augment(Group,{
  addItem : function(point,index){
    var _self = this,
      group = _self.get('group'),
      cfg;

    // 假如出现断点,point.value为空.则不处理
    if(point.value == null){
      return ;
    }
    if(index == null){
      index = _self.getItems().length;
    }
    if(!group){
      group = _self.addGroup();
      _self.set('group',group);
    }

    cfg = _self.getItemCfg(point,index);
    if(_self.get('animate')){
      cfg.path = _self.pointToFactorPath(point,0);
    }else{
      cfg.path = _self.pointToPath(point);
    }

    var shape = group.addShape('path',cfg);
    shape.isSeriesItem = true;
    shape.set('point',point);
    return shape;
  },
   //绑定点击事件
  bindItemClick : function(){
    var _self = this,
      cancelSelect = _self.get('cancelSelect');
    
    _self.on('click',function(ev){
      var target = ev.target,
        shape = target.shape,
        selected;
      if(shape && shape.isSeriesItem){
        if(_self.get('allowPointSelect')){
          selected = shape.get('selected');
          if(cancelSelect && selected){
            _self.clearSelected(shape)
          }else{
            _self.setSelected(shape);
          }
        }
        _self.fire('itemclick',{item : shape,point : shape.get('point')});
        _self.fireUpGroup('click',shape);
      }
    });
  },
  /**
   * 设置选中
   * @param {Object} item 选项
   */
  setSelected : function(item){
    var _self = this;
    if(!_self.isSelected(item)){
      _self.clearSelected();
      _self.setItemSelected(item,true);
      _self.onSelected(item);
    }
  },
  /**
   * @protected
   * points 发生改变时
   */
  changePoints : function(points){
    var _self = this,
      items = _self.getItems(),
      animate = _self.get('animate');

    points = points || _self.getPoints();

    //修改现有的path
    Util.each(items,function(item,index){
      var point = points[index],
        prePoint,
        path;
      if(point && item.get('visible')){
        prePoint = item.get('point');
        item.set('point',point);
        item.set('prePoint',prePoint);

        if(!animate){
          path = _self.pointToPath(point);
          item.attr('path',path);
        }else{
          _self.animateItem(item,prePoint);
        }
        if(point.obj && point.obj.attrs){
          item.attr(point.obj.attrs);
        }
      }
    });

    var count = points.length,
      length = items.length;

    //大于现有的点
    for (var i = length; i < count; i++) {
      var shape = _self.addItem(points[i],i);
      if(length > 1 ){
        animate && _self.animateItem(shape,items[items.length - 1].get('prePoint'));
      }
      
    }

    //小于现有的点
    for(var i = length - 1; i >= count; i--){
      var item = items[i];
      //item.remove();
      _self.removeItem(item);
    }

  },
  
  /**
   * @protected
   * 触发选中事件
   */
  onSelected : function(item){
    this.fire('itemselected',{item:item,point : item.get('point')});
    this.fireUpGroup('selected',item);
  },
  /**
   * @protected
   * 触发移除选中
   */
  onUnSelected : function(item){
    this.fire('itemunselected',{item:item,point : item.get('point')});
    this.fireUpGroup('unselected',item);
  },
  /**
   * 清除选中
   * @param  {Object} item 选项
   */
  clearSelected : function(item){
    var _self = this;
    item = item || _self.getSelected();
    if(item){
      _self.setItemSelected(item,false);
      _self.onUnSelected(item);
    }
  },
  /**
   * @protected
   * 设置选中
   * @param {Object} item  
   * @param {Boolean} selected 选中状态
   */
  setItemSelected : function(item,selected){

  },
  /**
   * 是否选中
   * @param  {Object}  item 是否选中
   * @return {Boolean}  是否选中
   */
  isSelected : function(item){
    return item && item.get('selected');
  },
  /**
   * 获取选中的项
   * @return {Object} 选中的项
   */
  getSelected : function(){
    var _self = this,
      items = _self.getItems(),
      rst;
    Util.each(items,function(item){
      if(_self.isSelected(item)){
        rst = item;
        return false;
      }
    });
    return rst;
  },
  /**
   * @protected
   * 获取子项的配置信息
   * @param  {Object} item 信息
   */
  getItemCfg : function(point,index){
    var _self = this,
      item = _self.get('item'),
      cfg = point.obj,
      rst = {};

    Util.mix(rst,item);
    if(cfg && cfg.attrs){
      Util.mix(rst,cfg.attrs);
    }
    return rst;
  },
  /**
   * 数据序列的子项
   * @return {Array} 子项集合
   */
  getItems : function(){
    var group = this.get('group');

    return group ? group.get('children') : [];
  },
  /**
   * 生成动画
   * @protected
   */
  animateItems : function(callback){
    var _self = this,
      items = _self.getItems();

    Util.animStep(_self.get('duration'),function(factor){

      Util.each(items,function(item){
        var point = item.get('point'),
          path = _self.pointToFactorPath(point,factor);
        item.attr('path',path);
      });
    },callback);
  },
  /**
   * 执行单个点的动画
   * @protected
   */
  animateItem : function(item,prePoint){
    var _self = this,
      point = item.get('point'),
      path = _self.pointToPath(point);

    item.animate({
      path : path
    },_self.get('changeDuration'));
  },
  /**
   * 删除子项
   * @param  {Object} item 子项
   */
  removeItem : function(item){
    var _self = this,
     animHadler = item.get('animHadler');
    _self.removeLabel(item);
    if(animHadler){
      Util.stopStep(animHadler);
    }
    item.remove();
  },
  /**
   * @protected
   * 移除对应的label
   */
  removeLabel : function(item){
    var label = item.get('label');
    label && removeLabel(label);;
  },
  /**
   * @protected
   * 动画过程中根据比例获取path
   * @param  {Object} point  子项的节点信息
   * @param  {Number} factor 比例
   * @return {Array}  path
   */
  pointToFactorPath : function(point,factor){

  },
  /**
   * @protected
   * 获取path
   * @param  {Object} point  子项的节点信息
   * @return {Array}  path
   */
  pointToPath : function(point){
    return this.pointToFactorPath(point,1);
  }
});


module.exports = Group;
