# Pie

---

饼图的demo

---

## Pie 


````html
<div id="p1">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
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

  pie.paint();

});
````

## inner text 


````html
<div id="p2">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p2',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : true,
    labels : {
      distance : -20,
      label : {
        fill : '#fff'
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

  pie.paint();

});
````


## multiple text 


````html
<div id="p3">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p3',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
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
      ['test',1],
      ['test',1],
      ['test',1],
      ['test',1],
      ['IE',       26.8],
      {
          name: 'Chrome',
          y: 12.8,
          sliced: true
      },
      ['Safari',    8.5],
      ['test',1],
      ['test',1],
      ['test',1],
      ['test',1],
      ['Opera',     6.2],
      ['test',1],
      ['test',1],
      ['test',1],
      ['test',1],
      ['Others',   0.7]
    ]
  });

  pie.paint();

});
````


## ring 


````html
<div id="p4">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p4',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
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
    innerSize : '60%',
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

  pie.paint();

});
````

## nest Ring


````html
<div id="p5">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p5',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);
  
  var colors = [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'];

  var pie = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : false,
    animate : false,
    colors : colors,
    radius : 100,
    innerRadius : 80,
    name: 'outter',
    startAngle : -198, // 360 * 60% / 2 + 90
    endAngle : 162, //
    data: [
      {name : 'outter',   y : 60},
      {name : '',y : 40,attrs : {fill : '#efefef'},placeHolder : true}
    ]
  });

  var pie1 = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : false,
    animate : false,
    name: 'middle',
    radius : 80, 
    innerRadius : 60,
    startAngle :  -144,//360 * 30% / 2 + 90
    endAngle : 226,
    data: [
      {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}},
      {name : '',y : 70,attrs : {fill : '#efefef'},placeHolder : true}
    ]

  });

  var pie2 = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : false,
    animate : false,
    name: 'inner',
    radius : 60,
    innerRadius : 40,
    startAngle :  -180,//360 * 50% / 2 + 90
    endAngle : 180,
    data: [
      {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}},
      {name : '',y : 50,attrs : {fill : '#efefef'},placeHolder : true}
    ]

  });

  pie.paint();
  pie1.paint();
  pie2.paint();

});
````

## pie stauts

````html
<div id="p6">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p6',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : true,
    events : {
      itemclick : function(ev){
        console.log('click');
      },
      itemselected : function(ev){
        console.log('selected');
      },
      itemunselected : function(ev){
        console.log('unselected');
      },
      itemactived : function(ev){
        console.log('actived');
      },
      itemunactived : function(ev){
        console.log('unactived');
      }
    },
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

  pie.paint();



});
````
