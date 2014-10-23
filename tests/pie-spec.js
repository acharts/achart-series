var expect = require('expect.js'),
    sinon = require('sinon'),
    PlotRange = require('achart-plot').Range,
    Simulate = require('event-simulate'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/pie')

  $('<div id="p1"></div>').prependTo('body');

/*
describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'p1',
    width : 900,
    height : 500
  });

  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series,{
    autoPaint : false,
    allowPointSelect : true,
    labels : {
      distance : 40,
      label : {

      },
      renderer : function(value,item){
          
          return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
      }
    },
    name: 'Browser share',
    animate : false,
    colors : [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'],
    data: [
      ['Firefox',   45.0],
      ['IE',       26.8],
      {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
      },
      ['Safari',    8.5],
      ['Opera',     6.2],
      ['Others',   0.7]
    ]
  });

  pie.paint();

  var itemGroup = pie.get('group');


  describe('测试饼图',function(){

    it('生成饼图',function(done){
      setTimeout(function(){
        expect(pie).not.to.be(undefined);
        expect(pie.get('node')).not.to.be(undefined);
        done();
      },1000);
      
    });
    it('生成label',function(){
      var labels = pie.get('labelsGroup');
      expect(labels.getCount()).to.be(pie.get('data').length);
    });

    it('点击选中饼图',function(done){
      var first = pie.getItems()[0];
      Simulate.simulate(first.get('node'),'click');
      setTimeout(function(){
        expect(first.get('selected')).to.be(true);
        done();
      },600);

    });

    it('点击其他',function(done){
      var first = pie.getItems()[0],
        second = pie.getItems()[1];
    
      Simulate.simulate(second.get('node'),'click');
      setTimeout(function(){
        expect(first.get('selected')).to.be(false);
        expect(second.get('selected')).to.be(true);
        done();
      },600);
    });

    it('点击取消',function(done){
      var second = pie.getItems()[1];

      Simulate.simulate(second.get('node'),'click');

      setTimeout(function(){
        expect(second.get('selected')).to.be(false);
        done();
      },500);
    });
  });

  describe('测试触发的事件',function(){
    var items = pie.getItems(),
    
    unActiveFn = sinon.spy();

    it('触发actived',function(done){
      var first = items[0],
        callback = sinon.spy();
      pie.on('itemactived',callback);

      Simulate.simulate(first.get('node'),'mouseover');

      setTimeout(function(){
        var info = pie.getTrackingInfo();
        //expect(info.name).to.be(first.get('name'));
        expect(first.get('actived')).to.be(true);
        expect(callback.called).to.be(true);

        pie.off('itemactived',callback);
        done();
      },500);
      
    });
    it('触发unactived',function(done){
      var first = items[0],
        second = items[1],
        callback = sinon.spy();
      pie.on('itemunactived',callback);
      Simulate.simulate(second.get('node'),'mouseover');

      setTimeout(function(){
        expect(first.get('actived')).to.be(false);
        expect(second.get('actived')).to.be(true);

        pie.off('itemunactived',callback);
        done();
      },500);
    });

    it('触发click,触发选中',function(done){
      var first = items[0],
        callback = sinon.spy(),
        selCallback = sinon.spy();
      pie.on('itemclick',callback);
      pie.on('itemselected',selCallback);
      Simulate.simulate(first.get('node'),'click');

      setTimeout(function(){
        expect(callback.called).to.be(true);
         expect(selCallback.called).to.be(true);
        pie.off('itemclick',callback);
        pie.off('itemselected',selCallback);
        done();
      },500);
    });

    it('触发取消选中',function(done){
      var first = items[0],
        callback = sinon.spy();
      pie.on('itemunselected',callback);

      Simulate.simulate(first.get('node'),'click');

      setTimeout(function(){
        expect(callback.called).to.be(true);
        pie.off('itemunselected',callback);
        done();
      },500);
    });
  });

  describe('operation',function(){

    it('change distance',function(done){
      var labels = pie.get('labelsGroup'),
        firstLabel = labels.getFirst(),
        x = firstLabel.attr('x');
      expect(firstLabel.attr('text-anchor')).to.be('end');

      pie.get('labelsGroup').set('distance',-20);
      pie.repaint();
      setTimeout(function(){
        var cLabel = labels.getFirst();
        expect(cLabel.attr('x')).not.to.be(x);
        expect(cLabel.attr('text-anchor')).to.be('end');
        expect(cLabel.attr('transform').length).not.to.be(0);
        done();
      },800);
    });

    it('change',function(done){
      var data = [
        ['Firefox',   45.0],
        ['Safari',    8.5],
        ['Opera',     6.2],
        ['Others',   0.7],
        {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            attrs : {
              fill : '#cccccc'
            },
            selected: true
        }
      ];

      pie.set('animate',true);

      pie.changeData(data,true);
      setTimeout(function(){
        expect(itemGroup.getCount()).to.be(data.length);
        var last = itemGroup.getLast();
        expect(last.attr('fill')).to.be('#cccccc');
        done();
      },800);

    });
    
    it('add',function(done){
      var count = itemGroup.getCount();

      pie.addPoint(['ie',20],false,true);
      setTimeout(function(){
        expect(itemGroup.getCount()).to.be(count + 1);
        done();
      },800);
    });
  });

});

*/
describe('测试legend',function(){

  var canvas = new Canvas({
    id : 'p1',
    width : 900,
    height : 500
  });

  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series,{
    autoPaint : false,
    allowPointSelect : true,
    legend : {
      layout : 'vertical',
      align : 'right'
    },
    labels : {
      distance : 40,
      label : {

      },
      renderer : function(value,item){
          
          return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
      }
    },
    name: 'Browser share',
    animate : true,
    colors : [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'],
    data: [
      ['Firefox',   45.0],
      ['IE',       26.8],
      {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
      },
      ['Safari',    8.5],
      ['Opera',     6.2],
      ['Others',   0.7]
    ]
  });

  pie.paint();

  var itemGroup = pie.get('group'),
    legendGroup = pie.get('legendGroup').get('itemsGroup');

  describe('legend',function(){
    it('legend 生成',function(){
      expect(legendGroup).not.to.be(undefined);
      expect(legendGroup.getCount()).to.be(itemGroup.getCount());
    });

    it('点击legend,隐藏对应项',function(done){

      setTimeout(function(){
        var first = legendGroup.getFirst();
        Simulate.simulate(first.get('node'),'click');
        expect(itemGroup.getFirst().get('visible')).to.be(false);
        done();
      },1000);
      
    });

    it('点击legend,显示对应项',function(done){
      setTimeout(function(){
        var first = legendGroup.getFirst();
        Simulate.simulate(first.get('node'),'click');
        expect(itemGroup.getFirst().get('visible')).to.be(true);
        done();
      },1000);
    });
/*
    
*/
    it('数据发生改变,不直接重绘',function(done){
      setTimeout(function(){
        var data = [
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Firefox',   45.0],
          ['IE',       26.8],
          ['Others',   0.7]
        ];
        pie.changeData(data,false);
        pie.repaint();
        done();
      },1000);
    });

    it('数据发生改变',function(done){
      setTimeout(function(){
        var data = [
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',   0.7]
        ];
        pie.changeData(data,true);
        done();
      },1200);
    });
  });
/*
*/
});
