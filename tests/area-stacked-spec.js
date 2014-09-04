var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('achart-canvas'),
  Area = require('../src/area'),
  Axis = require('achart-axis'),
  Plot = require('achart-plot'),
  NAxis = Axis.Number,
  CAxis = Axis.Category;

$('<div id="as1"></div>').prependTo('body');

describe('测试层叠区域图',function(){

  var canvas = new Canvas({
    id : 'as1',
    width : 900,
    height : 500
  });

  var group = canvas.addGroup(Plot.Item);

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(CAxis,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(NAxis,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      title : {
        text : 'xsxxxxx',
        font : '16px bold',
        fill : 'blue',
        rotate : 90,
        x : -30
      },
      min : -5,
      max : 80,
      position:'left',
      tickInterval : 20,
      labels : {
        label : {
          x : -12
        }
      }
    });

 



  var series = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    stackType : 'normal',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
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

  var series1 = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#910000',
    stackType : 'normal',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#8bbc21',
    stackType : 'normal',
    line : {
      
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : true,
    markers : {
      marker : {
        fill : '#8bbc21',
        stroke: '#8bbc21',
        symbol : 'square',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  });

  canvas.sort();
  
  it('points test',function(done){
    var points0 = series.getPoints(),
      data0 = series.get('data'),
      points1 = series1.getPoints(),
      data1 = series1.get('data'),
      points2 = series2.getPoints(),
      data2 = series2.get('data');

    setTimeout(function(){
      var index = 5;

      expect(points1[index].lowY).to.be(points0[index].y);
      expect(points2[index].lowY).to.be(points1[index].y);
      done();
    },800);
    
  });

  it('生成series',function(){
      var series = group.getFirst();
      expect(series).not.to.be(undefined);
      expect(series.get('areaShape')).not.to.be(undefined);
  });

  it('测试area',function(){
    var series = group.getChildAt(0);
    var  areaShape = series.get('areaShape'),
      lieShape = series.get('lineShape');
    expect(areaShape.getPath().length).to.be(lieShape.getPath().length + 3);
  });

  it('测试第二个area',function(done){
    setTimeout(function(){
      var series = group.getChildAt(1);
      var  areaShape = series.get('areaShape'),
        lieShape = series.get('lineShape');
      expect(areaShape.getPath().length).to.be(lieShape.getPath().length * 2 + 1);
      done();
    },500);
    
  });

  it('隐藏第一个，测试第二个area',function(done){

    var series = group.getChildAt(0);
    group.hideChild(series);
    series1.repaint();
    series2.repaint();
    setTimeout(function(){
      var series = group.getChildAt(1);
      var  areaShape = series.get('areaShape'),
        lieShape = series.get('lineShape');
      expect(areaShape.getPath().length).to.be(lieShape.getPath().length + 3);
      done();
    },1000);
    
  });
});

describe('测试层叠区域图',function(){

  var canvas = new Canvas({
    id : 'as1',
    width : 900,
    height : 500
  });

  var group = canvas.addGroup(Plot.Item);

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(CAxis,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(NAxis,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      title : {
        text : 'xsxxxxx',
        font : '16px bold',
        fill : 'blue',
        rotate : 90,
        x : -30
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

 
  var data0 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    data1 = [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    data2 = [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0];

  group.getStackedData = function(){
    var 
      rst = [];
    for(var i = 0 ; i < data0.length; i ++){
      rst.push(data0[i] + data1[i] + data2[i]);
    }
    return rst;
  }

  var series = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    stackType : 'percent',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
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
    data: data0
  });

  var series1 = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#910000',
    stackType : 'percent',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: data1
  });

  var series2 = group.addGroup(Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#8bbc21',
    stackType : 'percent',
    line : {
      
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : true,
    markers : {
      marker : {
        fill : '#8bbc21',
        stroke: '#8bbc21',
        symbol : 'square',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: data2
  });

  /**/
  canvas.sort();

  it('points test',function(done){
    var points0 = series.getPoints(),
      data0 = series.get('data'),
      points1 = series1.getPoints(),
      data1 = series1.get('data'),
      points2 = series2.getPoints(),
      data2 = series2.get('data');

    setTimeout(function(){
      var index = 5;

      expect(points1[index].lowY).to.be(points0[index].y);
      expect(points2[index].lowY).to.be(points1[index].y);

      var total = data0[index] + data1[index] + data2[index];

       expect(points1[index].yValue).to.be(data1[index]/total * 100);
      expect(points2[index].yValue).to.be(data2[index]/total * 100);
      done();
    },800);
    
  });

  it('生成series',function(){
      var series = group.getFirst();
      expect(series).not.to.be(undefined);
      expect(series.get('areaShape')).not.to.be(undefined);
  });

  it('测试area',function(){
    var series = group.getChildAt(0);
    var  areaShape = series.get('areaShape'),
      lieShape = series.get('lineShape');
    expect(areaShape.getPath().length).to.be(lieShape.getPath().length + 3);
  });

  it('getTipItem',function(){
    var point = {x : 410,y : 170},
      info = series.getTrackingInfo(point);

    var item = series.getTipItem(info);
    expect(info.value).to.be(item[0]);

  });

  it('测试第二个area',function(done){
    setTimeout(function(){
      var series = group.getChildAt(1);
      var  areaShape = series.get('areaShape'),
        lieShape = series.get('lineShape');
      expect(areaShape.getPath().length).to.be(lieShape.getPath().length * 2 + 1);
      done();
    },500);
    
  });

  it('隐藏第一个，测试第二个area',function(done){

    var series = group.getChildAt(0);
    group.hideChild(series);
    series1.repaint();
    series2.repaint();
    setTimeout(function(){
      var series = group.getChildAt(1);
      var  areaShape = series.get('areaShape'),
        lieShape = series.get('lineShape');
      expect(areaShape.getPath().length).to.be(lieShape.getPath().length + 3);
      done();
    },1000);
    
  });
});