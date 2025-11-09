
d3.csv("data/disney.csv", function(data)
{
    var filtered_data = data.filter(function(d) { 
        return d.type === "TV Show" && d.rating.startsWith("TV");
    });

var years = [];
for (var y = 1980; y <= 2020; y+=5){
    years.push(y);
} // end of for loop

var ratings = ["TV-Y", "TV-Y7", "TV-Y7-FV", "TV-G", "TV-PG", "TV-14"];

var allYearsData = years.map(function(year){

    var yearData = filtered_data.filter(function(d){
        return +d.release_year === year;
    }); // end of yearData

    var ratingCounts = ratings.map(function(rating)
        {
        var count = yearData.filter(function(d){
            return d.rating === rating;
            }).length;
            
        return {rating: rating, count: count};
            
        }); // end of rating counts
    
    return {year: year, counts: ratingsCounts};
        
    }); // end of allYearsData

   console.log(allYearsData);

}); // end of dc.csv











