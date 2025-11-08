<script>
    console.log("✅ script.js loaded successfully!");

    d3.csv("data/disney.csv", function(data)
    {
        var filtered_data = data.filter(function(d) { 
            return d.type === "TV Show" && d.rating.startsWith("TV");
        });
    
    console.log(filtered_data);
    
    
    
    
    });


    
    </script>




