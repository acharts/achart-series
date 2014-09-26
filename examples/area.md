# Area

---

区域图demo

---
## Area 

````html
<div id="a1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a1',
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
      'stroke-width': 1,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 2
    },
    animate : false,
    area : {
      stroke : 'none',
      fill : 'rgb(124, 181, 236)',
      'fill-opacity' : 0.5
    },
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

## break point

````html
<div id="a2">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a2',
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
  
  //不连接断点
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
    data: [7.0, 6.9, 9.5, 14.5, null, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  //断点进行连接
  var series1 = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#910000',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : true,
    connectNulls : true,
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [-0.9, 0.6, 3.5, 8.4, null, 17.0, 18.6, null, 14.3, 9.0, 3.9, 1.0]

  });

});
````


## stacked area

````html
<div id="a3">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a3',
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
      min : -10,
      max : 90,
      position:'left',
      tickInterval : 10,
      labels : {
        label : {
          x : -12
        }
      }
    });
  var group = canvas.addGroup(Plot.Item,{
    zIndex : 5
  });
  var series = group.addGroup(Series.Area,{
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

  var series1 = group.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#910000',
    stackType : 'normal',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  });

  var series2 = group.addGroup(Series.Area,{
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
    markers : {
      marker : {
        fill : '#8bbc21',
        stroke: '#8bbc21',
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

  canvas.sort();

});
````

## percent stacked area

````html
<div id="a4">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a4',
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
      min : -10,
      max : 90,
      position:'left',
      tickInterval : 10,
      labels : {
        label : {
          x : -12
        }
      }
    });
  var group = canvas.addGroup(Plot.Item,{
    zIndex : 5
  });
  
  var data0 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    data1 = [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    data2 = [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0];
  group.getStackedData = function(){
    var
      rst = [];
    for(var i = 0 ; i < data0.length; i ++){
      rst.push(data0[i] + data1[i] + data2[i]);
    }
    return rst;
  }
  var series = group.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#2f7ed8',
    stackType : 'percent',
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
    data:data0
  });

  var series1 = group.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#910000',
    stackType : 'percent',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: data1
  });

  var series2 = group.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color: '#8bbc21',
    stackType : 'percent',
    line : {
      
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : true,
    markers : {
      marker : {
        fill : '#8bbc21',
        stroke: '#8bbc21',
        symbol : 'square',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: data2
  });

  canvas.sort();

});
````