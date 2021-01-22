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
    .attr("transform", `translate(0, ${height})`)
    .call(axisBottom);

    chart.append("graph")
    .call(axisLeft);

    //create circles for the scatter chart
    var circles = char.selectAll("circle")
    .data(dataState)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.Poverty))
    attr("cy", d => yLinearScale(d.Healthcare))
    .attr("radius", "20")
    .attr("fill", "blue")
    attr("opacity", "0.5");

    var labels = chart.selectAll(null).data(dataState).enter().append("text");
    //add text and values to circle labels
    labels
        .attr("x", function(a){
            return xLinearScale(d.Poverty);
        })
        .attr("y", function(a){
            return yLinearScale(d.Healthcare);
        })
        .text(function(a){
            return d.abbr;
        })

})