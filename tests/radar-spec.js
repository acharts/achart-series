var expect = require('expect.js'),
    sinon = require('sinon'),
    simulate = require('event-simulate'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../index'),
  Plot = require('achart-plot'),
  PlotRange = require('achart-plot').Range,
  Axis = require('achart-axis'),

  NAxis = Axis.Number,
  CAxis = Axis.Category;

  $('<div id="r1"></div>').prependTo('body');



describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'r1',
    width : 900,
    height : 500
  });

  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY);

    console.log(point);
  });

  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      ticks : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Radius,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      circle : xAxis,
      grid : {
        type : 'circle',
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : -5,
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  var sGroup = canvas.addGroup(Plot.Item);

  canvas.sort();

  var series = sGroup.addGroup(Series.Line,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    animate : true,
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });
 
  var series1 = sGroup.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
    autoPaint : false,
    item : {
      fill: '#910000',

      'stroke': 'none'
    },
    animate : true,
    data: [0.2, 0.8, 5.7, 11.3, 17.0, {y: 22.0,attrs : {fill : '#f42'}}, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });
 
  series1.paint();
 

  describe('测试折线图生成',function(){

    it('create',function(done){
      setTimeout(function(){
        expect(series.get('node')).not.to.be(undefined);
        done();
      },1000);
      
    });

    it('path',function(){
      var lineShape = series.get('lineShape'),
        path = lineShape.getPath();
      expect(path.length).to.be(series.get('data').length + 1);

    });

    it('center',function(){
      var point = series.getCircleCenter();

      expect(point.x).to.be(plotRange.cc.x);
      expect(point.y).to.be(plotRange.cc.y);
    });

    it('point',function(){
      var points = series.getPoints(),
        data = series.get('data'),
        index = 5;

      expect(points[index].value).to.be(data[index]);

    });

    it('markers',function(){
      var markers = series.get('markersGroup');
      expect(markers.getCount()).to.be(series.get('data').length);
    });

    it('change data',function(done){
      var data = [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5];
      series.changeData(data,true);
      setTimeout(function(){
        var lineShape = series.get('lineShape'),
        path = lineShape.getPath();
        expect(path.length).to.be(series.get('data').length + 1);
        done();
      },1000);
    });

    it('get snap point',function(){
      var point = {x : 305,y : 205},
        info = series.getTrackingInfo(point),
        marker = series.getSnapMarker(point);

      expect(info.value).to.be(14.1);

      expect(marker).not.to.be(null);
      expect(parseInt(marker.attr('x'))).to.be(384);

    });
  });

  describe('则是柱状图',function(){
    var itemsGroup = series1.get('group');
    it('create',function(){
      expect(itemsGroup.getCount()).to.be(series1.get('data').length);
    });

    it('path',function(){
      var first = itemsGroup.getFirst();
      expect(first.getPath().length).to.be(4);
    });

    it('custom fill',function(){
      var item = itemsGroup.getChildAt(5);
      expect(item.attr('fill')).to.be('#f42');
    });

    
  });
  
  

});
