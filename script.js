d3.csv("data/disney.csv", function(data) {
    // --- Filter TV Shows with TV ratings ---
    var filtered_data = data.filter(function(d) { 
        return d.type === "TV Show" && d.rating.trim().toUpperCase().startsWith("TV"); 
    });

    // --- Years and ranges ---
    var maxYear = d3.max(filtered_data, function(d){ return +d.release_year; });
    var yearRanges = [];
    for (var start = 1970; start <= maxYear; start += 5){
        var end = Math.min(start + 4, maxYear);
        yearRanges.push({start: start, end: end});
    }

    // --- Ratings ---
    var ratings = ["TV-Y", "TV-Y7", "TV-Y7-FV", "TV-G", "TV-PG", "TV-14"];

    // --- Aggregate counts per year range ---
    var allYearsData = yearRanges.map(function(range){
        var rangeData = filtered_data.filter(function(d){
            var year = +d.release_year;
            return year >= range.start && year <= range.end;
        });

        var ratingCounts = ratings.map(function(rating) {
            var count = rangeData.filter(function(d){ return d.rating === rating; }).length;
            return {rating: rating, counts: count};
        });

        return {range: range.start + "-" + range.end, counts: ratingCounts};
    });

    // --- Tooltip ---
    var tooltip = d3.select("#tooltip")
        .style("opacity", 0);

    var viewTooltip = function(d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Title Count: " + d.counts)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
    };

    var moveTooltip = function(d) {
        tooltip.style("left", (d3.event.pageX + 20) + "px")
               .style("top", (d3.event.pageY - 20) + "px");
    };

    var hideTooltip = function(d) {
        tooltip.transition().duration(100).style("opacity", 0);
    };

    // --- SVG and margins ---
    var margin = {top: 40, right: 150, bottom: 70, left: 60};
    var width = 700 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#main")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var chartGroup = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // --- Scales ---
    var xScale = d3.scale.ordinal()
        .domain(ratings)
        .rangeRoundBands([0, width], 0.1);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(allYearsData[0].counts, function(d){ return d.counts; })])
        .range([height, 0]);

    var color = d3.scale.category10();

    // --- Axes ---
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    chartGroup.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chartGroup.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    chartGroup.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height + 50)
        .text("TV Rating Category");

    chartGroup.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -45)
        .text("Number of Series");

    // --- Bars ---
    function drawBarChart(data) {
        yScale.domain([0, d3.max(data, function(d){ return d.counts; })]);
        chartGroup.select(".y.axis").call(yAxis);

        var bars = chartGroup.selectAll(".bar")
            .data(data);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .on("mouseover", viewTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip);

        bars.transition()
            .duration(300)
            .attr("x", function(d){ return xScale(d.rating); })
            .attr("y", function(d){ return yScale(d.counts); })
            .attr("height", function(d){ return height - yScale(d.counts); })
            .attr("width", xScale.rangeBand())
            .attr("fill", function(d){ return color(d.rating); });

        bars.exit().remove();
    }

    drawBarChart(allYearsData[0].counts);

    // --- Slider ---
    var slider = d3.select("#yearSlider")
        .attr("max", allYearsData.length - 1);

    var yearLabel = d3.select("#yearLabel")
        .text(allYearsData[0].range);

    slider.on("input", function() {
        var index = +this.value;
        drawBarChart(allYearsData[index].counts);
        yearLabel.text(allYearsData[index].range);
    });

    // --- Legend ---
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width + margin.left + 20) + "," + margin.top + ")");

    var leg_items = legend.selectAll(".legend-item")
        .data(ratings)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", function(d,i){ return "translate(0," + (i*25) + ")"; });

    legend.append("rect")
        .attr("x", -10)
        .attr("y", -10)
        .attr("width", 100)
        .attr("height", ratings.length * 25 + 10)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1);

            
    leg_items.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", function(d){ return color(d); });

    leg_items.append("text")
        .attr("x", 24)
        .attr("y", 14)
        .text(function(d){ return d; })
        .style("font-size", "12px");
});




