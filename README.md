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
* Include <script src="lib/pym.min.js"></script> in the parent.

###Options
* Necessary:
 * data_url
 * valuetomap from dataset
 * countyid from dataset
 
* Optional:
 * nullcondition - could be *, a value, etc (default: "")
 * colors - predefined palettes or enter an array (default: palette.blue5)
 * missingcolor (default: #ccc)
 * Breaks for bins/legend: (default: 0-100% by 20%)
    * Default: breaks = [0.2, 0.4, 0.6, 0.8], legend_breaks = [0, 0.2, 0.4, 0.6, 0.8, 1.0]
    * If not displaying min and max, set legend_breaks = breaks;
 * formatter (default: d3.format("%"))

* For page:
 * title
 * links (optional)
 
 
###Child
* All defaults
![Defaults example](/img/fallback1.png)
Script from [map1.html](/map1.html)
```javascript
    data_url = "data/schoolpoverty.csv",
        valuetomap = "PercentPoor_NCES",
        countyid = "fipscounty";

    var pymChild = new pym.Child();
```
* Customs
![Custom example](/img/fallback3.png)
Script from [map3.html](/map3.html)
```javascript
        data_url = "data/schoolpoverty.csv",
            valuetomap = "TotalBlack",
            countyid = "fipscounty",
            colors = ["#feebe2", "#fbb4b9", "#f768a1", "#ae017e"],
            missingcolor = "#000",
            breaks = [200, 1000, 20000],
            legend_breaks = breaks,
            formatter = d3.format('.2s');
```
###Parent
See full parent at [index.html](/index.html)
Set style for div, insert div, call pym and child
```html

    <style>
        @import url("http://fonts.googleapis.com/css?family=Lato");
        body {
            font-family: 'Lato', sans-serif;
            color: #000;
        }
        
        .map {
            width: 100%;
            height: 100%;
            margin-bottom: 20px;
            max-width: 1400px;
        }
    </style>
    
    <div id="map1" class="map"></div>
    
        <script type="text/javascript" src="lib/pym.min.js"></script>
    <script>
        var pymParent = new pym.Parent('map1', 'map1.html', {});
    </script>
```

###Features to add
* Roll over legend to highlight bin in map

###To do
* Tooltips:
 * Move to be where the pointer points (top left of pointer)
 * Make a function for user to enter tooltip text
* Embed code
* datatools wrapper it
* Color palettes - add more, update
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state
