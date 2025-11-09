
d3.csv("data/disney.csv", function(data) {

    // 1️⃣ Filter for TV Shows with "TV" ratings
    var filtered_data = data.filter(function(d) {
        return d.type === "TV Show" && d.rating && d.rating.startsWith("TV");
    });

    // 2️⃣ List of every 5-year step
    var years = [];
    for (var y = 1980; y <= 2020; y += 5) {
        years.push(y);
    }

    // 3️⃣ The ratings categories you want to show on the chart
    var ratings = ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];

    // 4️⃣ Build the structured dataset (INSIDE the callback!)
    var allYearsData = years.map(function(year) {

        var yearData = filtered_data.filter(function(d) {
            return +d.release_year === year;
        });

        var ratingCounts = ratings.map(function(rating) {
            var count = yearData.filter(function(d) {
                return d.rating === rating;
            }).length;
            return { rating: rating, count: count };
        });

        return { year: year, counts: ratingCounts };
    });


    console.log(allYearsData);


});
