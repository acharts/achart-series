var expect = require('expect.js'),
    sinon = require('sinon'),
    PlotRange = require('achart-plot').Range,
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/pie')

  $('<div id="c1"></div>').prependTo('body');

describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'c1',
    width : 900,
    height : 500
  });

  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var series = group.addGroup(Series,{
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

  series.paint();

  var itemGroup = series.get('group');

  describe('pie create',function(){
    it('create',function(){
      expect(itemGroup).not.to.be(undefined);
    });

    it('pie items',function(){
      expect(itemGroup.getCount()).to.be(series.get('data').length)
    });

    it('labels,line',function(){
      
    });
    
  });

  describe('operation',function(){

    it('change',function(){

    });

    it('item click',function(){

    });
    
  });

});
