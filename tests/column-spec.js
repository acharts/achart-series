var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/column'),
  Axis = require('achart-axis'),
  NAxis = Axis.Number,
  CAxis = Axis.Category;

  $('<div id="c1"></div>').prependTo('body');

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

  describe('column create',function(){
    it('create',function(){

    });
    it('column width,offset',function(){

    });

    it('column items',function(){

    });

    it('custom attrs',function(){

    });
  });

  describe('operation',function(){

    it('change',function(){

    });

    it('item click',function(){

    });
    
  });

});
