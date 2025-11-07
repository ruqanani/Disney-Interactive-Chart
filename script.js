<script>
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Create the SVG container
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Inline test data
var data = [
  {Country:"A", Value:10},
  {Country:"B", Value:15},
  {Country:"C", Value:7}
];

// ----- X Axis -----
var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.2)
  .domain(data.map(function(d) { return d.Country; }));

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.svg.axis().scale(x).orient("bottom"))
  .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

// ----- Y Axis -----
var y = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.Value; })])
  .range([height, 0]);

svg.append("g")
  .attr("class", "y axis")
  .call(d3.svg.axis().scale(y).orient("left"));

// ----- Bars -----
svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Country); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.Value); })
    .attr("height", function(d) { return height - y(d.Value); })
    .style("fill", "#69b3a2");
</script>
