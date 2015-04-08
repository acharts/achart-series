var expect = require('expect.js'),
    sinon = require('sinon'),
    PlotRange = require('achart-plot').Range,
    Simulate = require(''),
    $ = require('jquery');
    
var Canvas = require('achart-canvas'),
  Series = require('../src/pie')

  $('<div id="pr1"></div>').prependTo('body');

describe('测试序列生成',function(){

  var canvas = new Canvas({
    id : 'pr1',
    width : 900,
    height : 500
  });

  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series,{
    autoPaint : false,
    //allowPointSelect : true,
    labels : {
      distance : 40,
      label : {

      },
      renderer : function(value,item){
          
          return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
      }
    },
    borderCircle:{
      stroke: '#efefef',
      'stroke-width': 1,
      distance: 15
    },
    name: 'Browser share',
    animate : true,
    innerSize : '60%',
    colors : [ '#f9c35a','#89ce6d','#b4e9fc'],
    data: [
      ['a',   45.0],
      ['a',       26.8],
      {
          name: 'Chrome',
          y: 12.8
      },
      ['a',    8.5],
      ['a',     6.2],
      ['a',   0.7]
    ]
  });

  pie.paint();

  var itemGroup = pie.get('group');
/**/


  describe('测试环图生成',function(){

    it('radius,inner radius',function(){
      var r = Math.min(plotRange.getWidth(),plotRange.getHeight());

      expect(pie.get('radius')).not.to.be(undefined);
      expect(pie.get('innerRadius')).not.to.be(undefined);
      expect(pie.get('innerRadius')).to.be(r * 0.6 / 2);

    });

    it('items',function(){
      var items = itemGroup.get('children');
      expect(items.length).to.be(pie.get('data').length);
    });

    it('path',function(done){
      setTimeout(function(){
        var first = itemGroup.getFirst();
        expect(first.getPath().length).to.be(6);
        done();
      },800);
      
    });

    it('change',function(){
      var data = [['chrome',10]];
      pie.set('animate',false);
      pie.changeData(data,true);

      expect(itemGroup.getCount()).to.be(1);
      //expect(itemGroup.get)
    });

    it('change large',function(){
      var data = [['chrome',10],['ie',20]];
     // pie.set('animate',true);
      pie.changeData(data,true);

      expect(itemGroup.getCount()).to.be(2);
    });

    xit('移除',function(){
      pie.remove();
      expect(itemGroup.get('children')).to.be(undefined);
    })
  });
});
