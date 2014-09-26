# Column

----

柱状图示例

----

## single column

````html
<div id="c1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
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

  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    animate : false,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  series.paint();
});

````

## multiple column

````html
<div id="c2">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c2',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
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

  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    animate : false,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  var series1 = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#6ebb46',
    animate : false,
    data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  series.paint();
  series1.paint();
});

````

## stacked column
````html
<div id="c3">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c3',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
      max : 60,
      position:'left',
      tickInterval : 10,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();
  var data0 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    data1 = [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5];
  group.getStackedData = function(){
    var
      rst = [];
    for(var i = 0 ; i < data0.length; i ++){
      rst.push(data0[i] + data1[i]);
    }
    return rst;
  }
  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    stackType : 'normal',
    animate : false,
    data: data0
  });

  var series1 = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#6ebb46',
    stackType : 'normal',
    animate : false,
    data: data1
  });

  series.paint();
  series1.paint();
});

````

## percent stacked column
````html
<div id="c31">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c31',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
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

  canvas.sort();

  var group = canvas.addGroup();
  var data0 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    data1 = [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5];
  group.getStackedData = function(){
    var
      rst = [];
    for(var i = 0 ; i < data0.length; i ++){
      rst.push(data0[i] + data1[i]);
    }
    return rst;
  }
  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    stackType : 'percent',
    animate : false,
    data: data0
  });

  var series1 = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#6ebb46',
    stackType : 'percent',
    animate : false,
    data: data1
  });

  series.paint();
  series1.paint();
});

````

## time axis

````html
<div id="c4">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c4',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Time,{
      plotRange : plotRange,
      startDate : new Date(2010,01,01).getTime(),
      endDate : new Date(2010,01,02).getTime(),
      tickInterval : 2 * 3600 * 1000,
      labels : {
        label : {
          y : 12
        }
      },
      tickOffset : 10,
      formatter : function(value){
        return new Date(value).getHours();
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
      max : 35,

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

  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    pointStart : new Date(2010,01,01).getTime(),
    pointInterval : 3600 * 1000,
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
    },
    animate : false,
    data: [34.4, 21.8, {y : 20.1,attrs : {fill : '#ff0000'}}, 20, 19.6, 19.5, 19.1, 18.4, 18,
        17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,18,20,16,
        11.7, 11.2]
  });

  series.paint();
});

````

## bar

````html
<div id="c5">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c5',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 2,
          x : -10,
          "text-anchor" : 'end'
        }
      },
      position : 'left'
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
      max : 40,
      position:'bottom',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();

  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    invert : true,
    labels : {
      label : {
        y : 0,
        x : 15,
        'text-anchor' : 'start'
      }
    },
    color : '#2f7ed8',
    animate : false,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  series.paint();
});

````

## stacked bar
````html
<div id="c51">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c51',
    width : 800,
    height : 500
  });

 var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 2,
          x : -10,
          "text-anchor" : 'end'
        }
      },
      position : 'left'
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
      max : 60,
      position:'bottom',
      tickInterval : 10,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var group = canvas.addGroup();
  var data0 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    data1 = [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5];
  group.getStackedData = function(){
    var
      rst = [];
    for(var i = 0 ; i < data0.length; i ++){
      rst.push(data0[i] + data1[i]);
    }
    return rst;
  }
  var series = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    invert : true,
    stackType : 'normal',
    animate : false,
    data: data0
  });

  var series1 = group.addGroup(Series.Column,{
    autoPaint : false,
    xAxis : xAxis,
    yAxis : yAxis,
    invert : true,
    color : '#6ebb46',
    stackType : 'normal',
    animate : false,
    data: data1
  });

  series.paint();
  series1.paint();
});

````

