
var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('achart-canvas'),
  Series = require('../src/area'),
  Axis = require('achart-axis'),
  NAxis = Axis.Number,
  CAxis = Axis.Time;

$('<div id="a1"></div>').prependTo('body');

describe('area null points',function(){

  var canvas = new Canvas({
    id : 'a1',
    width : 900,
    height : 500
  });

  var plotRange = {
      start : {x : 50,y : 400},
      end : {x : 850, y : 50}
    },
    xAxis = canvas.addGroup(CAxis,{
      plotRange : plotRange,
      type : 'time',
      labels : {
        label : {
          y : 12
        }
      },
      formatter : function(value){
        return new Date(value).getDate();
      },
      startDate : new Date(2001,01,01).getTime(),
      tickInterval :  2 * 3600 * 1000 * 24,
      endDate : new Date(2001,01,01).getTime() + 20 * 3600 * 1000 * 24
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
      max : 30,
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
    type : 'area',
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
    markers : null,
    pointStart : new Date(2001,01,01).getTime(),
    pointInterval : 3600 * 1000 * 24,
    data: [null,7.0, 6.9, 9.5, null,null,14.5, 18.2, null,21.5, 25.2, 26.5,null,null, 23.3, 18.3, 13.9, 9.6,null]
  });

  var lineShape = series.get('lineShape'),
      areaShape = series.get('areaShape'),
      path = lineShape.getPath(),
      apath = areaShape.getPath(),
      points = series.getPoints();

  describe('测试缺失点',function(){
    it('起始缺失点',function(){
      
      expect(path[0][1]).to.be(points[1].x);
      expect(apath[0][1]).to.be(points[1].x);
    });

    it('测试缺失1',function(){

      expect(path[3][1]).to.be(points[6].x);
      expect(apath[4][1]).to.be(points[3].x);
      expect(apath[5][1]).to.be(points[1].x);
    });

    it('测试缺失2',function(){
      expect(path[5][1]).to.be(points[9].x);
      expect(apath[9][1]).to.be(points[7].x);
      expect(apath[10][1]).to.be(points[6].x);
    });

    it('测试缺失3',function(){
      expect(path[8][1]).to.be(points[14].x);
      expect(apath[15][1]).to.be(points[11].x);
    });

    it('结束缺失点',function(){

      expect(path[path.length - 1][1]).to.be(points[points.length - 2].x);

      expect(apath[apath.length - 2][1]).to.be(points[points.length - 2].x);
    });
  });
  

});