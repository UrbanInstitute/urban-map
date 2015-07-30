#Urban Institute reusable county map template
d3 template for county and state level maps using Urban's style
* Primary goal: make standard maps with as little work as possible for the blog, website, etc
* Nice side effect: coerce good mapmaking decisions by having good defaults and style. [% > count](https://xkcd.com/1138/).

###Options
```javascript
    //minimum options necessary
    data_url = "path/to/data.csv",
        valuetomap = "colnamenofvalue",
        countyid = "colnameofid",
    //additional options if desired
        nullcondition = "somevalue/symbol", //default = ""
        colors = [custom or predefined array], //default = palette.blue5
        missingcolor = "#xxxxxx", //default = "#ccc"
        breaks = [array excluding min and max], //default = [0.2, 0.4, 0.6, 0.8]
        legend_breaks = breaks OR [array including min and max], //default = [0, 0.2, 0.4, 0.6, 0.8, 1.0]
        formatter =  d3.format("something"); //default =  d3.format("%"), percents rounded to whole number

    var pymChild = new pym.Child();
```

##Usage
* Child - minimum code needed for a default Urban blue percentage map:
```html
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" type="text/css" href="urbanmap/maps.css">
    </head>

    <body>

        <h1>Title</h1>
        <div id="legend"></div>
        <div id="map"><img src="path/to/fallback.png" alt="[Map]" /></div>

        <script src="lib/jquery.min.js"></script>
        <script src="lib/d3.min.js" charset="utf-8"></script>
        <script src="lib/modernizr.svg.min.js"></script>
        <script src="lib/topojson.v1.min.js"></script>
        <script src="lib/pym.min.js"></script>
        <script src="urbanmap/urbanmap.js"></script>

        <script>
            data_url = "path/to/data.csv",
                valuetomap = "colnamenofvalue",
                countyid = "colnameofid",

            var pymChild = new pym.Child();
        </script>


    </body>

    </html>
```
Option footer for links after map in child URL:
```html
        <div class="footnote">
            <p><b>Source</b>: Urban Institute, 2015
                <a href="http://www.urban.org" target="_blank" class="urban"><span style="color:#1696d2">Urban</span> <span style="color:#000">Institute</span></a>
            </p>
            <div class="links">
                <a href="img/defaultmap.PNG" target="_blank">Save map as image</a>
            </div>
        </div>
```

* Include in parent:
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
    
    <div id="mapname" class="map"></div>
    
    <script type="text/javascript" src="lib/pym.min.js"></script>
    <script>
        var pymParent = new pym.Parent('mapname', 'path/to/map.html', {});
    </script>
```

###Examples
Parent: [index.html](/index.html)

Children: [defaults-example.html](/defaults-example.html)
![All defaults map](/img/defaults-fallback.png)
[customs-example.html](/customs-example.html)
![All customs map](/img/customs-fallback.png)