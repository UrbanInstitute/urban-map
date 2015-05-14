//Non-responsive but Urban style - moving variables that user will define outside the map function

var $map = $("#map");

var map_data_url = "data/schoolpoverty.csv";
var json_url = "data/us.json";
var colors = ["#b0d5f1", "#82c4e9", "#0096d2", "#00578b", "#000"];
var breaks = [0.2, 0.4, 0.6, 0.8];
var legend_breaks = [0.2, 0.4, 0.6, 0.8, 1.0];
var legend_left = 0;
var formatter = d3.format("%");

var map_aspect_width = 1.7;
var map_aspect_height = 1;


function plainmap() {

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

    var value = d3.map();

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
            return color(value[d.id]);
        });

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states))
        .attr("class", "states")
        .attr("d", path);

    //d3.select(self.frameElement).style("height", height + "px");
}

$(window).load(function () {
    if (Modernizr.svg) { // if svg is supported, draw dynamic chart

        queue()
            .defer(d3.json, json_url)
            .defer(d3.csv, map_data_url)
            .await(ready);

        function ready(error, us, data) {
            var value = {};
            data.forEach(function (d) {
                value[d.id] = +d.PctPoorinPoorSchools;
            });


            plainmap();
            window.onresize = plainmap;
        }

    }
});