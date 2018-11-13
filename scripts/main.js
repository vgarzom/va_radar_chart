const vis_container = d3.select("#vis-container");
const vis_header = d3.select("#vis-header");

const NQColors = ({
    brown: "#e66f00",
    orange: "#F09B0C",
    yellow: "#C6BD22",
    dark_purple: "#370F4D",
    light_purple: "#916FBB",
    dark_grey: "#6F695D",
    purple: "#5534BF",
    light_grey: "#7D859C",
    red: "#ff3333",
    steelblue: "#666da3"
});

const NQTextColors = ({
    white: "#D7E4DB",
    orange: "#ffb066",
    purple: "#9575bd",
    grey: "#b6bbc8",
    red: "#ff8080",
    yellow: "#e1da51"
});

const
    margin = { top: 20, right: 50, bottom: 40, left: 70 },
    w = vis_container.node().getBoundingClientRect().width;
var
    h = 600,
    svg = vis_container.append('svg').attr("width", w).attr("height", h);

h = 600;

svg.style("font", "10px sans-serif")
    .style("width", "100%")
    .style("height", "auto");

var lento_reduction = -848;
var kasvis_reduction = -500;
var auto_reduction = -398;
var ekosähkö_reduction = -267;
var ekolämmitys_reduction = -2445;

var data = [
    [//Finnish average
        { axis: "Jätteet", value: Math.max(59, 0) },
        { axis: "Liikenne", value: Math.max(2088, 0) },
        { axis: "Ruoka", value: Math.max(1707, 0) },
        { axis: "Kulutus", value: Math.max(2533, 0) },
        { axis: "Asuminen", value: Math.max(3441, 0) },

    ], [//reduced
        { axis: "Jätteet", value: Math.max(59, 0) },
        { axis: "Liikenne", value: Math.max(2088 + auto_reduction + lento_reduction, 0) },
        { axis: "Ruoka", value: Math.max(1707 + kasvis_reduction, 0) },
        { axis: "Kulutus", value: Math.max(2533, 0) },
        { axis: "Asuminen", value: Math.max(3441 + ekosähkö_reduction + ekolämmitys_reduction, 0) },
    ]
]

var baseline_sum = 0;

data[0].forEach(function (d) {
    baseline_sum = baseline_sum + d.value
})

var reduced_sum = 0;

data[1].forEach(function (d) {
    reduced_sum = reduced_sum + d.value
})

function controlsChanged() {
    drawRadarChart(w, h, data);
}

controlsChanged();