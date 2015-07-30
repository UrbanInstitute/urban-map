#Urban Institute reusable map template - WIP
d3 template for county and state level maps using Urban's style
* Primary goal: make standard maps with as little work as possible for the blog, website, etc
* Nice side effect: coerce good mapmaking decisions by having good defaults and style. [% > count](https://xkcd.com/1138/).

##Usage
* Include all required dependencies in the child html:
```html
    <link rel="stylesheet" type="text/css" href="urbanmap/maps.css">
    
    <script src="lib/jquery.min.js"></script>
    <script src="lib/d3.min.js" charset="utf-8"></script>
    <script src="lib/modernizr.svg.min.js"></script>
    <script src="lib/topojson.v1.min.js"></script>
    <script src="lib/pym.min.js"></script>
    <script src="urbanmap/urbanmap.js"></script>    
```
* Parent:
```html 
    <div id="mapname" class="map"></div>
    
    <script type="text/javascript" src="lib/pym.min.js"></script>
    <script>
        var pymParent = new pym.Parent('mapname', 'path/to/map.html', {});
    </script>
```

###Options
```javascript
    //minimum options necessary
    data_url = "path/to/data.csv",
        valuetomap = "colnamenofvalue",
        countyid = "colnameofid",
    //additional options if desired
        nullcondition = "somevalue/symbol", //default = ""
        colors = [custom or predefined array], //default = palette.blue5
        missingcolor = "#xxxxxx", default = #ccc
        breaks = [array excluding min and max], default = [0.2, 0.4, 0.6, 0.8]
        legend_breaks = breaks OR [array including min and max], default = [0, 0.2, 0.4, 0.6, 0.8, 1.0]
        formatter =  d3.format("something"); //default =  d3.format("%"), percents rounded to whole number

    var pymChild = new pym.Child();
```

###Examples
Parent: [index.html](/index.html)
Children: [defaults-example.html](/defaults-example.html)
[customs-example.html](/customs-example.html)

###Features to add
* Roll over legend to highlight bin in map

###To do
* Tooltips:
 * Make position function of tooltip length
 * Make a function for user to enter tooltip text
* Embed code
* datatools wrapper it
* Color palettes - add more, update
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state
