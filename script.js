let currentCity = $("#current-city");
let currentTemp = $("#current-temperature");
let currentHumidity = $("#current-humidity");
let currentWS = $("#current-wind-speed");
let currentUV = $("#current-uv");

// Creating what happens when the search button is clicked
$('#search').on('click', function () {

    let apiKey = "1eb13712c6e86332340cfba6b9d3371d"
    let cityNameInput = $("#searched-city").val()
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial"

    

    // Original AJAX call for finding the city and the coordinates for that city
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        // Declaring a variable for the city's name
        let cityName = response.name;

        // Declaring a variable for the date
        let date = moment().format("M/D/YYYY");


        // Pulling the coordinates to use in another AJAX call to get the current temp
        let uvLat = response.coord.lat;
        let uvLon = response.coord.lon;

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + uvLat + "&lon=" + uvLon + "&units=imperial&appid=" + apiKey,
            method: "GET"
        }).then(function (res) {
            console.log(res)


            // Declaring the  current variables
            let uvIndex = res.current.uvi;
            let tempF = res.current.temp;
            let humidityP = res.current.humidity;
            let windS = res.current.wind_speed;

            //Setting the text of the html to what we get from the search
            currentCity.text(cityName + " (" + date + ")")
            currentTemp.text("Current Temperature: " + tempF + " ℉");
            currentHumidity.text("Current Humidity: " + humidityP + "%");
            currentWS.text("Current Wind Speed: " + windS + " MPH");
            currentUV.text("Current UV Index: " + uvIndex);

            // Creating a way for displaying differing colors for the increasing uv index
            if (uvIndex <= 4) {
                currentUV.addClass("bg-success");
            }
            else if (uvIndex > 4 || uvIndex < 7) {
                currentUV.addClass("bg-warning");
            }
            else if (uvIndex > 7) {
                currentUV.addClass("bg-danger")
            }
        })
    })


})