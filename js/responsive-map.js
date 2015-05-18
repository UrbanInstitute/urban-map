//defaults, and declare vars that will always need to be specified by user
var $map = $('#map');
var us,
    map_aspect_width = 1.7,
    map_aspect_height = 1,
    json_url = "data/us-named.json",
    colors = palette.blue5,
    breaks = [0.2, 0.4, 0.6, 0.8],
    legend_breaks = [0.2, 0.4, 0.6, 0.8, 1.0],
    legend_left = 0,
    formatter = d3.format("%"),
    missingcolor = "#ccc",
    value = {},
    data_url,
    valuetomap,
    countyid;

//user defined, or override
data_url = "data/schoolpoverty.csv",
    valuetomap = "PctPoorinPoorSchools",
    countyid = "fips",
    missingcolor = "#ea0e41";
    //colors = palette.blue3,
    //breaks = [0.333, 0.666],
    //legend_breaks = [0.333, 0.666, 1];

function urbanmap() {

    var margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
    };

    var width = $map.width() - margin.left - margin.right;
    var height = Math.ceil((width * map_aspect_height) / map_aspect_width) - margin.top - margin.bottom;

    $map.empty();

    var svg = d3.select("#map").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scale.threshold()
        .domain(breaks)
        .range(colors);

    var legend = svg.selectAll("g.legend")
        .data(legend_breaks)
        .enter().append("g")
        .attr("class", "legend");

    var lp_w = 3 * width / 5,
        ls_w = 40,
        ls_h = 18;

    svg.append("text")
        .text(formatter(legend_left))
        .attr("x", lp_w - 5)
        .attr("y", 15)
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) {
            return (i * ls_w) + lp_w;
        })
        .attr("y", 20)
        .attr("width", ls_w)
        .attr("height", ls_h)
        .attr("z-index", 10)
        .style("fill", function (d, i) {
            return colors[i];
        })

    legend.append("text")
        .attr("x", function (d, i) {
            return (i * ls_w) + lp_w + ls_w - 15;
        })
        .attr("y", 15)
        .text(function (d, i) {
            return formatter(d);
        });

    var projection = d3.geo.albersUsa()
        .scale(width * 1.2)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    svg.selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("class", "counties")
        .attr("d", path)
        .style("fill", function (d) {
            if (value[d.id] != null) {
                return color(value[d.id]);
            } else {
                return missingcolor;
            }
        })
        .call(d3.helper.tooltip(
            function (d, i) {
                if (value[d.id] == null) {
                    return "<b>" + d.properties.name + "</b></br> No data";
                } else {
                    return "<b>" + d.properties.name + "</b></br>" + formatter(value[d.id]);
                }
            }
        ));

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);
}

$(window).load(function () {
    if (Modernizr.svg) {
        d3.json(json_url, function (json) {
            d3.csv(data_url, function (data) {
                us = json;

                data.forEach(function (d) {
                    if (d[valuetomap] == "") {
                        value[d[countyid]] = null;
                    } else {
                        value[d[countyid]] = +d[valuetomap];
                    }
                });

                urbanmap();
                window.onresize = urbanmap;
            })
        });
    };
});