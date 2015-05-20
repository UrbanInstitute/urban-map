#Urban Institute reusable map template - WIP
d3 template for county and state level maps using Urban's style
* Primary goal: make standard maps with as little work as possible for the blog, website, etc
* Nice side effect: coerce good mapmaking decisions by having good defaults and style. [% > count](https://xkcd.com/1138/).

* Responsive using [pym.js](https://github.com/nprapps/pym.js)
* Use Urban's [datatools embed](https://github.com/UrbanInstitute/datatools-embed) for wrapper

###Example use: body of the child index, using all defaults except color of missing data:
From [map2.html](/map2.html)
```html
<body>

    <h2>Map #2 with custom missing color</h2>
    <div id="legend"></div>
    <div id="map"></div>
    <div class="footnote">Source: Urban Institute, 2015</div>

    <script src="lib/jquery.js"></script>
    <script src="lib/modernizr.svg.min.js"></script>
    <script src="lib/d3.v3.min.js"></script>
    <script src="lib/topojson.v1.min.js"></script>
    <script src="lib/pym.min.js"></script>
    <script src="js/tooltip.js"></script>
    <script src="js/colorpalettes.js"></script>
    <script src="js/responsive-map.js"></script>

    <script>
        data_url = "data/test.csv",
            valuetomap = "PctPoorinPoorSchools",
            countyid = "fips",
            missingcolor = "#b12a6d";

        var pymChild = new pym.Child();
    </script>

</body>
```

###Things for the user to define
* Necessary:
 * data_url
 * valuetomap from dataset
 * countyid from dataset
* Can go with the defaults or overwrite:
 * nullcondition - could be *, a value, etc (default: "")
 * colors - predefined palettes or enter an array (default: palette.blue5)
 * missingcolor (default: #ccc)
 * Breaks for bins/legend: (default: 0-100% by 20%)
    * Default: breaks = [0.2, 0.4, 0.6, 0.8], legend_breaks = [0.2, 0.4, 0.6, 0.8, 1.0], legend_left = 0
 * breaks - array excluding min and max
 * legend_breaks - array excluding min
 * legend_left - min to appear in legend
 * formatter (default: d3.format("%"))
 * tooltip text (default: County | XX% )
 * N/A text (default: County | No data)
* For page:
 * title
 * source note
 * embed button - optional

###Features to add
* Optional embed button
* Roll over legend to highlight bin in map
* A feature that would be good to have is a "redacted" or "ignored flag" --> basically a way of saying "if Column X in the csv meets some condition, add a class to the path and grey it out, plus allow for a custom tooltip"
* Do we want a categorical option - different legend style and all? Would we use it?

###To do
* Tooltips:
 * Move to be where the pointer points (top left of pointer)
 * Make a function for user to enter tooltip text
* datatools wrapper it
* Color palettes - add more, update
* CSS for source notes, embed buttons
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state

###Issues
Southeastern Alaska: remade json using 2014 shapefiles, still have old geographies. SIGH CENSUS BUREAU. [Boundary differences here](http://www.cdc.gov/nchs/data/nvss/bridged_race/County_Geography_Changes.pdf). This will be an issue for researchers using the new county fips. No solution as of yet.
