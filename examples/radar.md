# Radar

---

雷达图示例

---


## Line


````html
<div id="r1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
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

  var series = canvas.addGroup(Series.Line,{
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
    smooth : true,
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

});
````

## area

````html
<div id="r2">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r2',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      tickInterval : 45,
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
      max : 10,
      position:'left',
      tickInterval : 2,
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
    data: [8, 4, 6, 5, 7, 3, 4, 1]
  });

});
````

## column

````html
<div id="r4">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r4',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      tickInterval : 45,
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
      max : 10,
      position:'left',
      tickInterval : 2,
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
    autoPaint :false,
    color : '#2f7ed8',
    animate : false,
   
    data: [8, 4, 6, 5, 7, 3, 4, 1]
  });

  var series1 = group.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
    autoPaint :false,
    color : '#6ebb46',
    animate : false,
   
    data: [1,2,4,3,6,8,5,7]
  });
  series.paint();
  series1.paint();

});
````

## column stacked

````html
<div id="r5">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r5',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      tickInterval : 45,
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
      max : 15,
      position:'left',
      tickInterval : 3,
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
    autoPaint :false,
    color : '#2f7ed8',
    stackType : 'normal',
    animate : false,
   
    data: [8, 4, 6, 5, 7, 3, 4, 1]
  });

  var series1 = group.addGroup(Series.Column,{
    xAxis : xAxis,
    yAxis : yAxis,
    autoPaint :false,
    color : '#6ebb46',
    animate : false,
    stackType : 'normal',
    data: [1,2,4,3,6,8,5,7]
  });
  series.paint();
  series1.paint();

});
````




