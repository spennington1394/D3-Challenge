// set up variables to use
var svgWidth = 900;
var svgHeight = 450;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
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

d3.csv("assets/data/data.csv").then(function(stateData) {

    //covert data for poverty and healthcare
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    //scale for x and y linear scale
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(stateData, d => d.poverty)])
    .range([5, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
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
    var circles = chart.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("radius", "20")
    .attr("fill", "blue")
    .attr("opacity", "0.5");

    var labels = chart.selectAll(null).data(stateData).enter().append("text");
    //add text and values to circle labels
    labels
        .attr("x", function(d){
            return xLinearScale(d.poverty);
        })
        .attr("y", function(d){
            return yLinearScale(d.healthcare);
        })
        .text(function(d){
            return d.abbr;
        })
        .attr("font-family", "times-new-roman")
        .attr("font-size", "8px")
        .attr("text-ancher", "left")
        .attr("fill", "black");

    // set up tool tip variable and create tooltip chart
    var Tip = d3.tip()
    .attr("class", "tooltil")
    .offset([40,60])
    .html(function(a){
        return(`${a.state}<br>Poverty (%): ${d.poverty}<br>Healthcare (%): ${d.healthcare}`);

    });

    chart.call(Tip);

    //create event listener to display and hide tooltip
    circlesGroup.on('click', function(data) {
        Tip.show(data, this);
      })
      .on("mouseout", function(data, index) {
        Tip.hide(data);
      });
      // Create axes labels
      chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 50)
        .attr("x", 0 - (height/ 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
  
      chart.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
    }).catch(function(error) {
      console.log(error);


        });