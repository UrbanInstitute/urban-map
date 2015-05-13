var width = 800,
    height = width / 1.7;

var margin = {
    top: 30,
    right: 10,
    bottom: 10,
    left: 10
};

var svg = d3.select("#map").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colors = ["#b0d5f1", "#82c4e9", "#0096d2", "#00578b", "#000"]

var color = d3.scale.threshold()
    .domain([0.2, 0.4, 0.6, 0.8])
    .range(colors);

var breaks = [0.20, 0.40, 0.60, 0.80, 1.00];
var formatter = d3.format("%")

var legend = svg.selectAll("g.legend")
    .data(breaks)
    .enter().append("g")
    .attr("class", "legend");

var lp_w = 3 * width / 5,
    ls_w = 40,
    ls_h = 18;

svg.append("text")
    .text(formatter(0))
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

var value = d3.map();

var projection = d3.geo.albersUsa()
    .scale(width * 1.2)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/schoolpoverty.csv")
    .await(ready);

function ready(error, us, matchtypes) {
    var value = {};
    matchtypes.forEach(function (d) {
        value[d.id] = +d.PctPoorinPoorSchools;
    });

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
}

d3.select(self.frameElement).style("height", height + "px");