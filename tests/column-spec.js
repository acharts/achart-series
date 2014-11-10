var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/column'),
  Plot = require('achart-plot'),
  Axis = require('achart-axis'),
   Simulate = require('event-simulate'),
  NAxis = Axis.Number,
  CAxis = Axis.Category;

  $('<div id="c1"></div>').prependTo('body');
/**/

describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'c1',
    width : 900,
    height : 500
  });

  

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(CAxis,{
      plotRange : plotRange,
      categories : [
                'Tokyo',
                'Jakarta',
                'New York',
                'Seoul',
                'Manila',
                'Mumbai',
                'Sao Paulo',
                'Mexico City',
                'Dehli',
                'Osaka',
                'Cairo',
                'Kolkata',
                'Los Angeles',
                'Shanghai',
                'Moscow',
                'Beijing',
                'Buenos Aires',
                'Guangzhou',
                'Shenzhen',
                'Istanbul'
            ],
      labels : {
        label : {
          y : 12,
          rotate : 90
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
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();

  var series = group.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    autoPaint : false,
    color : '#2f7ed8',
    name: 'Africa',
    data: [34.4, 21.8, {y : 20.1,attrs : {fill : '#ff0000'}}, 20, 19.6, 19.5, 19.1, 18.4, 18,
        17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
        11.7, 11.2],
    allowPointSelect : true,
    labels : {
      label : {
        rotate : -90,
        y : 10,
        'fill' : '#fff',
        'text-anchor' : 'end',
        'textShadow': '0 0 3px black',
        'font-size' : '14px'
      }
    }
  });

  series.paint();

  var itemsGroup = series.get('group');

  describe('column create',function(){
    it('create',function(done){
      setTimeout(function(){
        expect(series.get('node')).not.to.be(undefined);
        expect(series.get('node').className.baseVal).to.be('x-chart-column')
        done();
      },800);
      
    });
    it('column width,offset',function(){
      
      expect(series.get('columnWidth')).to.be(xAxis.getTickAvgLength()/2);
      expect(series.get('columnOffset')).to.be(0);
    });

    it('column items',function(){
      expect(itemsGroup.get('node').childNodes.length).to.be(series.get('data').length);
    });

    it('custom attrs',function(){
      var item = itemsGroup.getChildAt(2);
      expect(item.attr('fill')).to.be('#ff0000');
    });

  });
/*
  describe('operation',function(){

    it('change',function(done){
      var data = [20, 19.6, 19.5, 19.1, 18.4, 18,
                17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
                11.7, 11.2];
      series.changeData(data,true);

      setTimeout(function(){
        expect(itemsGroup.getCount()).to.be(data.length);
        expect(series.get('labelsGroup').getCount()).to.be(data.length);
        done();
      });
    });

    it('add and shift',function(done){
      var value = 10,
        first = itemsGroup.getFirst(),
        second = itemsGroup.getChildAt(1),
        count = itemsGroup.getCount();
      series.addPoint(value,true,true);

      setTimeout(function(){
        expect(itemsGroup.getFirst()).not.to.be(first);
        expect(itemsGroup.getFirst()).to.be(second);
        expect(itemsGroup.getCount()).to.be(count);
        done();
      });
    });

    it('add item',function(done){
      var value = 21;
      series.addPoint(value,false,true);

      setTimeout(function(){
        var last = itemsGroup.getLast();
        expect(last.get('point').value).to.be(value);
        done();
      });
    });

    it('track info',function(){
      var point = {x : 750,y : 207};

      var info = series.getTrackingInfo(point);
      expect(info).not.to.be(null);
      expect(info.value).to.be(21);

      series.onStickyTracking({point : point});

      expect(series.getActived().get('point').value).to.be(21);
    });

    it('item click',function(){
      var first = itemsGroup.getFirst();

      Simulate.simulate(first.get('node'),'click');

      expect(first.get('selected')).to.be(true);
    });

    it('item click other',function(){
      var first = itemsGroup.getFirst(),
        last = itemsGroup.getLast();

      Simulate.simulate(last.get('node'),'click');

      expect(first.get('selected')).to.be(false);
      expect(last.get('selected')).to.be(true);
    });

    it('item over',function(){
      var first = itemsGroup.getFirst(),
        point = first.get('point'),
        lastPoint = itemsGroup.getLast().get('point');

      series.onStickyTracking({point : point});
      expect(first.get('actived')).to.be(true);


      series.onStickyTracking({point : lastPoint});

      expect(first.get('actived')).to.be(false);
    });
    
  });
*/
});
/*
describe('手工设置宽度',function(){

  var canvas = new Canvas({
    id : 'c1',
    width : 900,
    height : 500
  });

  

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(CAxis,{
      plotRange : plotRange,
      categories : [
                'Tokyo',
                'Jakarta',
                'New York',
                'Seoul',
                'Manila',
                'Mumbai',
                'Sao Paulo',
                'Mexico City',
                'Dehli',
                'Osaka',
                'Cairo',
                'Kolkata',
                'Los Angeles',
                'Shanghai',
                'Moscow',
                'Beijing',
                'Buenos Aires',
                'Guangzhou',
                'Shenzhen',
                'Istanbul'
            ],
      labels : {
        label : {
          y : 12,
          rotate : 90
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
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();

  var series = group.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    autoWidth : false,
    columnWidth : 10,
    autoPaint : false,
    color : '#2f7ed8',
    name: 'Africa',
    data: [34.4, 21.8, {y : 20.1,attrs : {fill : '#ff0000'}}, 20, 19.6, 19.5, 19.1, 18.4, 18,
        17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
        11.7],
    allowPointSelect : true,
    labels : {
      label : {
        rotate : -90,
        y : 10,
        'fill' : '#fff',
        'text-anchor' : 'end',
        'textShadow': '0 0 3px black',
        'font-size' : '14px'
      }
    }
  });

  series.paint();

  var itemsGroup = series.get('group');

  it('column width,offset',function(){
      
      expect(series.get('columnWidth')).to.be(10);
      expect(series.get('columnOffset')).to.be(0);
  });

  it('add item',function(done){
      var value = 21;
      series.addPoint(value,false,true);

      setTimeout(function(){
        var last = itemsGroup.getLast();
        expect(last.get('point').value).to.be(value);
        done();
      });
    });
});

describe('测试层叠区域图',function(){

  var canvas = new Canvas({
    id : 'c1',
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

  var series = group.addGroup(Series,{
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
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  var series1 = group.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#910000',
    stackType : 'normal',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = group.addGroup(Series,{
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
      expect(series.get('node')).not.to.be(undefined);
      expect(series.get('group')).not.to.be(undefined);
  });

  it('测试column',function(){
    var  group = series.get('group');
    expect(group.getCount()).to.be(series.get('data').length);
  });

  it('测试第一个column',function(){
    var 
      first = series.get('group').getFirst();
    expect(first.getPath()[0][2]).to.be(yAxis.getOffset(0));
  });

  it('隐藏第一个，测试第二个area',function(done){

    group.hideChild(series);
    series1.repaint();
    series2.repaint();
    setTimeout(function(){
      var group = series1.get('group'),
      first = group.getFirst();
      expect(first.getPath()[0][2]).to.be(yAxis.getOffset(0));
      done();
    },1000);
    
  });
});


describe('test time axis',function(){
  var canvas = new Canvas({
    id : 'c1',
    width : 900,
    height : 500
  });

  

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(Axis.Time,{
      plotRange : plotRange,
      startDate : 1264982400000,
      endDate : 1265068800000,
      tickInterval : 2 * 3600 * 1000,
      labels : {
        label : {
          y : 12
        }
      },
      tickOffset : 10,
      formatter : function(val){
        return new Date(val).getHours();
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
      max : 40,
      position:'left',
      tickInterval : 5,
      
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();

  var series = group.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    autoPaint : false,
    color : '#2f7ed8',
    name: 'Africa',
    pointInterval : 3600 * 1000,
    pointStart : 1264982400000,
    data: [34.4, 21.8, {y : 20.1,attrs : {fill : '#ff0000'}}, 20, 19.6, 19.5, 19.1, 18.4, 18,
        17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,18,20,16,
        11.7, 11.2],
    allowPointSelect : true,
    labels : {
      label : {
        rotate : -90,
        y : 10,
        'fill' : '#fff',
        'text-anchor' : 'end',
        'textShadow': '0 0 3px black',
        'font-size' : '14px'
      }
    }
  });

  series.paint();

  it('test column width',function(){

  });
});
*/
