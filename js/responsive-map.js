var $map = $('#map');
var us;
var data_url = "data/schoolpoverty.csv",
    json_url = "data/us.json",
    names_url = "data/countynames.csv",
    colors = palette.blue5,
    breaks = [0.2, 0.4, 0.6, 0.8],
    legend_breaks = [0.2, 0.4, 0.6, 0.8, 1.0],
    legend_left = 0,
    formatter = d3.format("%"),
    valuetomap = "PctPoorinPoorSchools",
    countyid = "id";

var map_aspect_width = 1.7,
    map_aspect_height = 1;

var value = {},
    countyname = {};

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

    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function (d) {
            return color(value[d[countyid]]);
        })
        .call(d3.helper.tooltip(
            function (d, i) {
                return countyname[d[countyid]] + "</br>" + formatter(value[d.id]);
            }
        ));;

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);
}

$(window).load(function () {
    if (Modernizr.svg) { // if svg is supported, draw dynamic chart

        d3.json(json_url, function (json) {
            d3.csv(data_url, function (data) {
                d3.csv(names_url, function (names) {
                    us = json;

                    data.forEach(function (d) {
                        value[d[countyid]] = +d[valuetomap];
                    });
                    names.forEach(function (d) {
                        countyname[d[countyid]] = d.name;
                    });

                    urbanmap();
                    window.onresize = urbanmap;
                })
            })
        });

    };
});