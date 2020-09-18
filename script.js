$('#search').on('click', function() {

let apiKey = "1eb13712c6e86332340cfba6b9d3371d"
let cityNameInput = "Flagstaff"
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput + "&appid=" + apiKey



$.ajax({
    url:queryURL,
    method: "GET"
}).then(function(response){
    
    console.log(response)
})
})