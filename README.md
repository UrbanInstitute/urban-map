#Urban Institute reusable map template - WIP
d3 template for county and state level maps using Urban's style, fully responsive and IE compatible
* Building on Ben's version
* Responsive using [pym.js](https://github.com/nprapps/pym.js)
* Use Urban's [datatools embed](https://github.com/UrbanInstitute/datatools-embed) for wrapper

##Features to add
* Optional embed button
* Roll over legend to highlight bin in map
* A feature that would be good to have is a "redacted" or "ignored flag" --> basically a way of saying "if Column X in the csv meets some condition, add a class to the path and grey it out, plus allow for a custom tooltip"

##To do
* Southeastern Alaska issue - make sure json & names have latest counties
* Make legend separate svg
* Tooltips:
 * Move to be where the pointer points (top left of pointer)
 * Adjust based on svg position so it switches sides if needed
 * Make a function for user to enter tooltip text
* datatools wrapper it
* Color palettes - add more, update
* CSS for source notes, embed buttons
* 2.0: allow single state mapping: separate jsons & aspect ratios needed for each state

##Things for the user to define
* Necessary:
 * data_url
 * valuetomap
 * countyid (column in their data w/ fips code)
* Can go with the defaults or overwrite:
 * colors (default: palette.blue5, missing = #ccc)
 * breaks, legend_breaks, legend_left (default: 0-100% by 20%)
 * formatter for numbers (default: %)
 * tooltip text (default: County | % )
 * N/A text (default: County | No data)
* For page:
 * title
 * source note
 * embed button - optional

#Example: body of the child index, using all defaults except color for missing data:

```html
<body>

    <h2>Map #2 with custom missing color</h2>
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