d3.helper = {};

d3.helper.tooltip = function (accessor) {
    return function (selection) {
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function (d, i) {
                // Clean up lost tooltips
                d3.select('body').selectAll('div.tooltip').remove();
                // Append tooltip
                tooltipDiv = d3.select('body').append('div').attr('class', 'urban-map-tooltip');
                var absoluteMousePos = d3.mouse(bodyNode);
                if ((absoluteMousePos[0] - 150) < 100) {
                    tooltipDiv.style('left', (absoluteMousePos[0]) + 'px')
                        .style('top', (absoluteMousePos[1] - 45) + 'px')
                        .style('position', 'absolute')
                        .style('z-index', 1001);
                } else {
                    tooltipDiv.style('left', (absoluteMousePos[0] - 150) + 'px')
                        .style('top', (absoluteMousePos[1] - 45) + 'px')
                        .style('position', 'absolute')
                        .style('z-index', 1001);
                }
                // Add text using the accessor function
                var tooltipText = accessor(d, i) || '';
            })
            .on('mousemove', function (d, i) {
                // Move tooltip
                var absoluteMousePos = d3.mouse(bodyNode);
                if ((absoluteMousePos[0] - 150) < 100) {
                    tooltipDiv.style('left', (absoluteMousePos[0]) + 'px')
                        .style('top', (absoluteMousePos[1] - 45) + 'px');
                } else {
                    tooltipDiv.style('left', (absoluteMousePos[0] - 150) + 'px')
                        .style('top', (absoluteMousePos[1] - 45) + 'px');
                }
                var tooltipText = accessor(d, i) || '';
                tooltipDiv.html(tooltipText);
            })
            .on("mouseout", function (d, i) {
                tooltipDiv.remove();
            });

    };
};

//defaults, and declare vars that will always need to be specified by user
var $map = $('#map');
var $legend = $('#legend');
var us,
    mobile_threshold = 600,
    map_aspect_width = 1.8,
    map_aspect_height = 1,
    json_url = "data/us-named.json",
    colors = palette.blue5,
    breaks = [0.2, 0.4, 0.6, 0.8],
    legend_breaks = [0.2, 0.4, 0.6, 0.8, 1.0],
    legend_left = 0,
    formatter = d3.format("%"),
    missingcolor = "#ccc",
    nullcondition = "",
    value = {},
    data_url,
    valuetomap,
    countyid,
    pymchild = null;

function urbanmap(container_width) {
    if (container_width == undefined || isNaN(container_width)) {
        container_width = 1300;
    }

    var margin = {
        top: 2,
        right: 10,
        bottom: 10,
        left: 10
    };

    var width = container_width - margin.left - margin.right;
    var height = Math.ceil((width * map_aspect_height) / map_aspect_width) - margin.top - margin.bottom;

    $map.empty();

    $legend.empty();

    var svg = d3.select("#map").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scale.threshold()
        .domain(breaks)
        .range(colors);

    var marginl = {
        top: 5,
        right: 10,
        bottom: 2,
        left: 10
    };

    if (container_width < mobile_threshold) {
        marginl.bottom = 55;
    } else {
        marginl.bottom = 5;
    }

    var lsvg = d3.select("#legend").append("svg")
        .attr("width", width + marginl.left + marginl.right)
        .attr("height", 50 + marginl.top + marginl.bottom)
        .append("g")
        .attr("transform", "translate(" + marginl.left + "," + marginl.top + ")");

    if ($legend.width() < mobile_threshold) {
        var lp_w = 10,
            ls_w = 40,
            ls_h = 18;
    } else {
        var lp_w = (3 * width / 5),
            ls_w = 40,
            ls_h = 18;
    }

    var legend = lsvg.selectAll("g.legend")
        .data(legend_breaks)
        .enter().append("g")
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

    legend.append("text")
        .attr("x", lp_w - 5)
        .attr("y", 15)
        .text(formatter(legend_left));

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

    // This is calling an updated height.
    if (pymChild) {
        pymChild.sendHeight();
    }
}

$(window).load(function () {
    if (Modernizr.svg) {
        d3.json(json_url, function (json) {
            d3.csv(data_url, function (data) {
                us = json;

                data.forEach(function (d) {
                    //need to accommodate string fips, like in school poverty data (leading 0s)
                    d[countyid] = +d[countyid];
                    //missing data! deal with it!
                    if (d[valuetomap] == nullcondition) {
                        value[d[countyid]] = null;
                    } else {
                        value[d[countyid]] = +d[valuetomap];
                    }
                });

                // This is instantiating the child message with a callback but AFTER the D3 charts are drawn.
                pymChild = new pym.Child({
                    renderCallback: urbanmap
                });
            })
        });
    } else { // If not, rely on static fallback image. No callback needed.
        pymChild = new pym.Child({});
    }
});