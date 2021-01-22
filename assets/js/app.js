// set up variables to use
var svgWidth = 900;
var svgHeight = 450;

var margin = {
    top: 30,
    right: 50,
    bottom: 90,
    left: 100
};

//create width and height variables

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom 

//create svg wrapper with index.html tag
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//append svg group to hold chart
var chart = svg.append("graph")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data

d3.csv("assets/data/data.csv").then(function(stateData){

    //covert data for poverty and healthcare
    dataState.forEach(funciton(data){
        data.Poverty = +data.Poverty;
        data.Healthcare = +data.Healthcare;
    });

    //scale for x and y linear scale
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(dataState, d => d.Poverty)])
    .range([5, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(dataState, d => d.Healthcare)])
    .range([height, 0]);

    //left and bottom axis functions with x and y LinearScale var  
    var axisBottom = d3.axisBottom(xLinearScale);
    var axisLeft = d3.axisLeft(yLinearScale);

    //append axis to chart var 
    chart.append("graph")
    .attr
})