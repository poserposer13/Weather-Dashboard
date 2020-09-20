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



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        let cityName = response.name;
        // Pulling the coordinates to use in another AJAX call to get the uv index
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

            currentCity.text(cityName)
            currentTemp.text("Current Temperature: " + tempF + "℉");
            currentHumidity.text("Current Humidity: " + humidityP + "%");
            currentWS.text("Current Wind Speed: " + windS + "MPH");
            currentUV.text("UV Index: " + uvIndex);
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