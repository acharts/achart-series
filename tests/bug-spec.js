var expect = require('expect.js'),
    sinon = require('sinon'),
    PlotRange = require('achart-plot').Range,
    Simulate = require('event-simulate'),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/pie')

  $('<div id="b1"></div>').prependTo('body');


describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'b1',
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
    data: [["Tokyo",49.9],["New York",83.6],["London",48.9],["Berlin",42.4]]
  });

  pie.paint();

  setTimeout(function(){
    pie.changeData([["Tokyo",71.5],["New York",78.8],["London",38.8],["Berlin",33.2]],true)
  },200);

  

  var itemGroup = pie.get('group');
});