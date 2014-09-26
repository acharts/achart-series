var expect = require('expect.js'),
    sinon = require('sinon'),
    simulate = require('event-simulate'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/line'),
  Axis = require('achart-axis'),

  NAxis = Axis.Number,
  CAxis = Axis.Category;

  $('<div id="l1"></div>').prependTo('body');


/**/

describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'l1',
    width : 900,
    height : 500
  });

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

  var series = canvas.addGroup(Series,{
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

  var series1 = canvas.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    line : {
      stroke: '#910000',
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    smooth : true,
    animate : true,
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, {y: 22.0,marker : {symbol : 'circle'}}, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = canvas.addGroup(Series,{
    xAxis : xAxis,
    yAxis : yAxis,
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    labels : {
      label : {
        y : -15
      }
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
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  });
  describe('测试一般折线的生成',function(){
    var node = series.get('node');

    it('points',function(){
      var points = series.getPoints();
      expect(points.length).to.be(series.get('data').length);
    });

    it('测试线的生成',function(done){
      setTimeout(function(){
        expect(series.get('node')).not.to.be(undefined);
        expect(series.get('children').length).not.to.be(0);
        done();
      },1000);
      
    });

    it('测试线上的点',function(){
      var line = series.get('lineShape'),
        path = line.getPath();
      expect(path.length).to.be(series.get('data').length);

    });

    it('测试颜色',function(){
      var line = series.get('lineShape');
      expect(line.attr('stroke')).to.be('#2f7ed8');

    });
    it('测试tracker',function(){
      var tracker = series.get('trackerShape'),
        path = tracker.getPath();
      expect(path.length).to.be(series.get('data').length + 1);
      expect(tracker.attr('stroke-width')).to.be(22);
    });

    it('测试labels',function(){
      var labelsGroup = series.get('labelsGroup');
      expect(labelsGroup).not.to.be(undefined);
      expect(labelsGroup.get('children').length).to.be(series.get('data').length);
    });

    function getOffsetX(pageX){
      var cnode = $(canvas.get('node')),
        offset = cnode.offset();
      return pageX - offset.left;
    }

    it('测试鼠标事件',function(){
      //simulate.simulate(series.get('node'),'mouseover');
    });

    it('测试markers',function(){
      var markersGroup = series.get('markersGroup');
      expect(markersGroup).not.to.be(undefined);
      expect(markersGroup.get('children').length).to.be(series.get('data').length);
    });

  });
  
  describe('测试自定义折线',function(){

    it('测试线上的点',function(){
      var line = series2.get('lineShape'),
        path = line.getPath();
      expect(path.length).to.be(series2.get('data').length);

    });
    it('测试折线颜色',function(){
      var lineShape = series2.get('lineShape');
      expect(lineShape.attr('stroke')).to.be('#8bbc21')
    });

    it('测试markers颜色',function(){
      var markers = series2.get('markersGroup');
      expect(markers.getFirst().attr('fill')).to.be('#8bbc21');
    });

  });
  describe('测试操作',function(){

    it('隐藏',function(){
      series.hide();
      expect(series.get('node').style.display).to.be('none');
    });

    it('显示',function(){
      series.show();
      expect(series.get('node').style.display).not.to.be('none');
    });

    it('change data',function(){
      var data = [17.0, 16.9, 19.5, 24.5, 28.2, 31.5, 35.2, 36.5, 33.3, 28.3];

      series2.changeData(data,true);
      var points = series2.getPoints();
      expect(points.length).to.be(data.length);
      expect(points[0].value).to.be(data[0]);

      expect(series2.getData('yAxis').length).to.be(data.length);
    });



    it('add data',function(){
      var value = 20,
        count = series2.get('points').length;
      series2.addPoint(value,false,false);

      expect(series2.get('data').length).to.be(count + 1);
      expect(series2.get('points').length).to.be(count);

      series2.addPoint(value + 5,false,true);

      expect(series2.get('data').length).to.be(count + 2);
      expect(series2.get('points').length).to.be(count + 2);
    });

    it('add and shift',function(){
      var value = 16,
         count = series2.get('points').length;
      series2.addPoint(value,true,true);

      expect(series2.get('data').length).to.be(count);

    });

    it('change animate',function(done){
      var data = [13.9, 14.2, 15.7, 18.5, 21.9, 25.2, 27.0, 26.6, 24.2, 20.3, 16.6];

      series.changeData(data,true);
      setTimeout(function(){
        var points = series.getPoints();
        expect(points.length).to.be(data.length);
        expect(points[0].value).to.be(data[0]);
        done();
      },800)

    });

    it('add and shift animate',function(done){
      var value = 10,
       count = series.get('points').length;

      series.addPoint(value,true,true);
      expect(series.get('points').length).to.be(count + 1);
      setTimeout(function(){
        expect(series.get('points').length).to.be(count);
        done();
      },1200);
    });

    it('get snap marker',function(){
      var point = {x : 146,y:205},
        info = series2.getTrackingInfo(point),
        marker = series.getSnapMarker(point);

      expect(info.value).to.be(19.5);

      expect(marker).not.to.be(null);
      expect(marker.attr('x')).to.be(150);
    });

    it('set active',function(){
      series.setActived();
      expect(series.get('lineShape').attr('stroke-width')).to.be(3);
    });

    it('unactive',function(){
      series.clearActived();
      expect(series.get('lineShape').attr('stroke-width')).to.be(2);
    });

    xit('移除',function(done){
      setTimeout(function(){
        $('#11').remove();
        done();
      },800);
    });
  });
  
});


describe('time axis',function(){

  var canvas = new Canvas({
    id : 'l1',
    width : 900,
    height : 500
  });

  var start = new Date(2010,01,01).getTime();

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(Axis.Time,{
      plotRange : plotRange,
      startDate : start,
      endDate : new Date(2011,01,01).getTime(),
      tickInterval : 30 * 24 * 3600 * 1000,
      labels : {
        label : {
          y : 12
        }
        
      },
      formatter : function(value){
          var date = new Date(value);
          return date.getFullYear() + '-' + date.getMonth();
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

  var series = canvas.addGroup(Series,{
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
    pointStart : start,
    pointInterval : 30 * 24 * 3600 * 1000,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  it('create',function(){
    expect(series.get('node')).not.to.be(undefined);
  });

  it('points',function(){
    expect(series.getPoints().length).to.be(series.get('data').length);
    expect(series.get('lineShape').getPath().length).to.be(series.get('data').length);
  });

  it('get data',function(){
    var data = series.getData('xAxis'),
      length = series.getPoints().length;
    expect(data.length).to.be(2);
    expect(data[0]).to.be(start);
    expect(data[1]).to.be(start + (length -1) * 30 * 24 * 3600 * 1000);
  });

  it('change array data',function(done){
    series.set('pointStart',null);
    series.set('pointInterval',null);
    var data = [
      
    ];
    for(var i = 0 ; i < 10; i++){
      var date = start  + i * 30 * 24 * 3600 * 1000,
        value = 10 + parseInt(Math.random() * 10);

        data.push([date,value]);
    }

    series.changeData(data,true);
    setTimeout(function(){
      expect(series.getPoints().length).to.be(data.length);
      expect(series.get('lineShape').getPath().length).to.be(data.length);
      done();
    },1000);
  });

  it('get data',function(){
    var datax = series.getData('xAxis'),
      datay = series.getData('yAxis'),
      data = series.get('data');

    for(var i = 0;i <data.length ;i++){
      expect(data[i][0]).to.be(datax[i]);
      expect(data[i][1]).to.be(datay[i]);
    }

  });
});

describe('time axis',function(){

  var canvas = new Canvas({
    id : 'l1',
    width : 900,
    height : 500
  });

  var start = new Date('2012-01-04').getTime();

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(Axis.Time,{
      plotRange : plotRange,
      type : 'time',
      startDate : start,
      endDate : new Date('2012-01-16').getTime(),
      tickInterval : 2 * 24 * 3600 * 1000,
      labels : {
        label : {
          y : 12
        }
      },
      formatter : function(value){
        var date = new Date(value);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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

  var data = [
      ['2012-01-04',7.0], 
      ['2012-01-05',6.9], 
      ['2012-01-06',9.5],
      ['2012-01-07',14.5],
      ['2012-01-08',18.2],
      ['2012-01-09',21.5],
      ['2012-01-10',25.2],
      ['2012-01-11',26.5],
      ['2012-01-12',23.3],
      ['2012-01-13',18.3], 
      ['2012-01-14',13.9], 
      ['2012-01-15',9.6]
  ];
  var series = canvas.addGroup(Series,{
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
    data: data
  });

  it('create',function(done){

    setTimeout(function(){
      expect(series.get('lineShape')).not.to.be(undefined);
      expect(series.get('lineShape').getPath().length).to.be(data.length);
      done();
    },1000)
    
  });

  it('get data',function(){
    var data = series.getData('xAxis');
    expect(data[0]).to.be('2012-01-04');

    expect(data.length).to.be(series.get('data').length);
  });

  it('change data',function(done){
    var data = [];

    for(var i = 5 ; i < 16;i++ ){
      var obj = {};
      obj.x = '2012-01-0' + i;
      obj.y = parseInt(Math.random() * 10) + 10;
      data.push(obj);
    }

    series.changeData(data,true);
    setTimeout(function(){
      //expect(series.get('lineShape').getPath().length).to.be(data.length);
      done();
    },1000);
    

  });

  it('get data',function(done){
    var data = series.getData('xAxis');
    expect(data[0]).to.be('2012-01-05');
    setTimeout(function(){
      expect(data.length).to.be(series.get('data').length);
      done();
    },1000);
    
  });


  
});
/*
*/