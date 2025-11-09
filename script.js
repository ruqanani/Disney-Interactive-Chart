
d3.csv("data/disney.csv", function(data)
{
    var filtered_data = data.filter(function(d) { 
        return d.type === "TV Show" && d.rating.startsWith("TV");
    });
    

var yearRanges = [];
for (var start = 1970; start <= 2020; start += 5){
    yearRanges.push({start: start, end: start + 4});
} // end of for loop

var ratings = ["TV-Y", "TV-Y7", "TV-Y7-FV", "TV-G", "TV-PG", "TV-14"];

var allYearsData = yearRanges.map(function(range){

    var rangeData = filtered_data.filter(function(d){
        var year = +d.release_year;
        return year >= range.start && year <= range.end;
    }); // end of yearData

    var ratingCounts = ratings.map(function(rating)
        {
        var count = rangeData.filter(function(d){
            return d.rating === rating;
            }).length;
            
        return {rating: rating, counts: count};
            
        }); // end of rating counts
    
    return {range: range.start + "-" + range.end, counts: ratingCounts};
        
    }); // end of allYearsData

   console.log(allYearsData);

}); // end of dc.csv

















