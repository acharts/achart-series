var expect = require('expect.js'),
    sinon = require('sinon'),
    simulate = require('event-simulate'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../index'),
  PlotRange = require('achart-plot').Range,
  Axis = require('achart-axis'),

  NAxis = Axis.Number,
  CAxis = Axis.Category;

  $('<div id="rs1"></div>').prependTo('body');



describe('雷达图层叠区域图生成',function(){

  var canvas = new Canvas({
    id : 'rs1',
    width : 900,
    height : 500
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
      min : 0,
      max : 100,
      position:'left',
      tickInterval : 20,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var series = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    stackType : 'normal',
    animate : false,
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
  
  var series1 = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    stackType : 'normal',
    color : '#910000',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : false,
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [0.2, 0.8, 5.7, 11.3, 17.0, 22, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    stackType : 'normal',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    
    animate : false,
    color : '#8bbc21',
    markers : {
      marker : {
        symbol : 'square',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  });
  
  it('create',function(){
    expect(series.get('node')).not.to.be(undefined);
    expect(series1.get('node')).not.to.be(undefined);
    expect(series1.get('node')).not.to.be(undefined);
  });

  it('points',function(){
    var points = series.getPoints(),
      points1 = series1.getPoints();

    var index = 5,
      point = points[index],
      point1 = points1[index];

    expect(point.xValue).to.be(360 * (1/12) * index);

  });

  it('path',function(){
    var lineShape = series1.get('lineShape'),
      areaShape = series1.get('areaShape'),
      path = lineShape.getPath(),
      aPath = areaShape.getPath();

    expect(path.length).to.be(series1.get('data').length + 1);
    expect(aPath.length).to.be((series1.get('data').length + 1) * 2 + 1);
  });

  it('getsnap',function(){
    var point = {x : 371,y : 341};

    var info = series2.getTrackingInfo(point);

    expect(info.xValue).to.be(360 * (1/12) * 7);
  });


});


describe('雷达图层叠区域图生成',function(){

  var canvas = new Canvas({
    id : 'rs1',
    width : 900,
    height : 500
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
      min : 0,
      max : 100,
      position:'left',
      tickInterval : 20,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();

  var series = group.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    autoPaint : false,
    stackType : 'normal',
    animate : false,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });
  
  var series1 = group.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
     autoPaint : false,
    stackType : 'normal',
    color : '#910000',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : false,
    data: [0.2, 0.8, 5.7, 11.3, 17.0, 22, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = group.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
     autoPaint : false,
    stackType : 'normal',
    animate : false,
    color : '#8bbc21',
    data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  });
  
  series.paint();
  series1.paint();
  series2.paint();
  
  it('create',function(){
    expect(series.get('node')).not.to.be(undefined);
    expect(series1.get('node')).not.to.be(undefined);
    expect(series1.get('node')).not.to.be(undefined);
  });

  it('points',function(){
    var points = series.getPoints(),
      points1 = series1.getPoints();

    var index = 5,
      point = points[index],
      point1 = points1[index];

    expect(point.xValue).to.be(360 * (1/12) * index);

  });

  it('path',function(){
    var first = series.get('group').getFirst(),
      path = first.getPath(),
      aPath = series1.get('group').getFirst().getPath();

    expect(path.length).to.be(4);
    expect(aPath.length).to.be(6);
  });

  it('hide first',function(){
    series.hide();

    series1.repaint();
    series2.repaint();

    var 
      aPath = series1.get('group').getFirst().getPath();

    expect(aPath.length).to.be(4);

  });

  it('getsnap',function(){
    var point = {x : 371,y : 341};

    var info = series2.getTrackingInfo(point);

    expect(info.xValue).to.be(360 * (1/12) * 7);
  });


});
