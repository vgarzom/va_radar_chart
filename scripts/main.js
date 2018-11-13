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
var partidos = [
    "CENTRO DEMOCRATICO (COLOMBIA)",
    "PARTIDO CONSERVADOR COLOMBIANO",
    "PARTIDO LIBERAL COLOMBIANO",
    "PARTIDO SOCIAL DE UNIDAD NACIONAL PARTIDO DE LA U",
    "PARTIDO OPCION CIUDADANA",
    "PARTIDO CAMBIO RADICAL",
    "POLO DEMOCRATICO ALTERNATIVO",
    "PARTIDO VERDE",
    "MOVIMIENTO INDEPENDIENTE DE RENOVACIÓN ABSOLUTA MIRA",
    "ALIANZA SOCIAL INDEPENDIENTE ASI",
    "AUTORIDADES INDIGENAS DE COLOMBIA AICO",
    "MOVIMIENTO ALTERNATIVA INDIGENA SOCIAL MAIS",
    "UNION PATRIOTICA UP",
    "FUERZA ALTERNATIVA REVOLUCIONARIA DEL COMUN FARC",
    "COLOMBIA JUSTA LIBRES CJL",
    "VOTOS BLANCOS",
    "VOTOS NO MARCADOS",
    "VOTOS NULOS"
]
var data = [
    { name: "Senado", values: [], total: 0 },
    { name: "Camara", values: [], total: 0 },
    { name: "Alcaldía", values: [], total: 0 }
];

d3.csv("assets/data/2011/sen.csv", (d) => {
    d.value = +d.value;
    d.axis = d.axis.trim();
    if (partidos.includes(d.axis)) {
        data[0].values.push(d);
        data[0].total += d.value;
    }
}).then(() => {
    d3.csv("assets/data/2011/cam.csv", (d) => {
        d.value = +d.value;
        d.axis = d.axis.trim();
        if (partidos.includes(d.axis)) {
            data[1].values.push(d);
            data[1].total += d.value;
        }
    }).then(() => {
        d3.csv("assets/data/2011/alc.csv", (d) => {
            d.value = +d.value;
            d.axis = d.axis.trim();
            if (partidos.includes(d.axis)) {
                data[2].values.push(d);
                data[2].total += d.value;
            }
        }).then(() => {
            console.log(data);
            controlsChanged();
        })
    })
})

var baseline_sum = 0;
var reduced_sum = 0;

function controlsChanged() {
    drawRadarChart(w, h, data);
}
