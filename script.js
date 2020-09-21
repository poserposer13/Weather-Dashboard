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

    let cityArr = [];

    // Original AJAX call for finding the city and the coordinates for that city
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        // Declaring a variable for the city's name
        let cityName = response.name;

        // Adding the user's input into an array

        if (cityNameInput === null) {
            cityArr = [];
        }
        else if (cityNameInput !== null) {
            cityArr.push(cityName);
            console.log(cityArr);
        }
        let previousCity = $("<li>");
        previousCity.addClass("list-group-item text-white");
        previousCity.text(cityArr[0]);
        $("previous-cities").append(previousCity);



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
            $("#current-weather").addClass("border rounded")

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

            // Creating the 5 day forecast

            // 0 is the current day which is why I want to start at 1

            // This code needs to definitely be refactored
            $("#day-one-date").text(moment().add(1, 'd').format("M/D/YYYY"))
            $("#one-day-temp").text("Temperature: " + res.daily[1].temp.day + " ℉");
            $("#day-one").removeClass("d-none");
            $("#day-two-date").text(moment().add(2, 'd').format("M/D/YYYY"))
            $("#two-day-temp").text("Temperature: " + res.daily[2].temp.day + " ℉");
            $("#day-two").removeClass("d-none");
            $("#day-three-date").text(moment().add(3, 'd').format("M/D/YYYY"))
            $("#three-day-temp").text("Temperature: " + res.daily[3].temp.day + " ℉");
            $("#day-three").removeClass("d-none");
            $("#day-four-date").text(moment().add(4, 'd').format("M/D/YYYY"))
            $("#four-day-temp").text("Temperature: " + res.daily[4].temp.day + " ℉");
            $("#day-four").removeClass("d-none");
            $("#day-five-date").text(moment().add(5, 'd').format("M/D/YYYY"))
            $("#five-day-temp").text("Temperature: " + res.daily[5].temp.day + " ℉");
            $("#day-five").removeClass("d-none");
            $("#one-day-humid").text("Humidity: " + res.daily[1].humidity + "%");
            $("#two-day-humid").text("Humidity: " + res.daily[2].humidity + "%");
            $("#three-day-humid").text("Humidity: " + res.daily[3].humidity + "%");
            $("#four-day-humid").text("Humidity: " + res.daily[4].humidity + "%");
            $("#five-day-humid").text("Humidity: " + res.daily[5].humidity + "%");





        })

    })
})