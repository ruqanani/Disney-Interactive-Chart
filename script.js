
d3.csv("data/disney.csv", function(data)
{
    var filtered_data = data.filter(function(d) { 
        return d.type === "TV Show" && d.rating.startsWith("TV");
    });

var years = [];
for (var y = 1980; y <= 2020; y+=5){
    years.push(y);
}
console.log(years);

filtered_data.forEach(function(d) {
    

});



});










