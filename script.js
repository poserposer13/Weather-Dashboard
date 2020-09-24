$(document).ready(function () {
    let currentCity = $("#current-city");
    let currentTemp = $("#current-temperature");
    let currentHumidity = $("#current-humidity");
    let currentWS = $("#current-wind-speed");
    let currentUV = $("#current-uv");
    let currentIcon = $("#current-icon");

    // Setting an array to get a list of cities that were searched
    let cityArr = [];

    let searchedCities = localStorage.getItem("searched-cities");

    console.log(searchedCities)
    if (searchedCities !== null) {
        cityArr = JSON.parse(searchedCities)
    }

    


    

    // Creating what happens when the search button is clicked
    $('#search').on('click', function (event) {
        event.preventDefault();
        let apiKey = "1eb13712c6e86332340cfba6b9d3371d"
        let cityNameInput = $("#searched-city").val()
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial"



        cityArr.push(cityNameInput);
        localStorage.setItem("searched-cities", JSON.stringify(cityArr));
        let renderList = function () {
            for (let i = 0; i < 9; i++) {
                
                let previousCity = $(`<li class="list-group-item">`);
                previousCity.text(cityArr[i]);
                $("previous-cities").append(previousCity);
                // This is included in the function as well so that 
                currentUV.removeClass("d-inline bg-danger bg-success bg-warning");
            }
        }
        renderList();


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

            
                renderList();






                // Declaring the  current variables
                let uvIndex = res.current.uvi;
                let tempF = res.current.temp;
                let humidityP = res.current.humidity;
                let windS = res.current.wind_speed;
                let weatherIcon = res.current.weather[0].icon

                //Setting the text of the html to what we get from the search
                currentCity.text(cityName + " (" + date + ")");
                currentIcon.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")

                currentTemp.text("Current Temperature: " + tempF + " ℉");
                currentHumidity.text("Current Humidity: " + humidityP + "%");
                currentWS.text("Current Wind Speed: " + windS + " MPH");
                currentUV.text("Current UV Index: " + uvIndex);
                $("#current-weather").addClass("border rounded mb-2 bg-primary border-info")

                // Creating a way for displaying differing colors for the increasing uv index
                if (uvIndex <= 4) {
                    currentUV.addClass("d-inline bg-success");
                }
                if (uvIndex > 4 && uvIndex < 7) {
                    currentUV.addClass("d-inline bg-warning");
                }
                if (uvIndex >= 7) {
                    currentUV.addClass("d-inline bg-danger")
                }

                // Creating the 5 day forecast

                // 0 is the current day which is why I want to start at 1

                // This code needs to definitely be refactored

                $("#day-one-date").text(moment().add(1, 'd').format("M/D/YYYY"))
                $("#one-day-temp").text("Temperature: " + res.daily[1].temp.day + " ℉");
                $("#one-day-humid").text("Humidity: " + res.daily[1].humidity + "%");
                $("#day-one-icon").attr("src", "http://openweathermap.org/img/wn/" + res.daily[1].weather[0].icon + ".png")
                $("#day-one").removeClass("d-none");

                $("#day-two-date").text(moment().add(2, 'd').format("M/D/YYYY"))
                $("#two-day-temp").text("Temperature: " + res.daily[2].temp.day + " ℉");
                $("#two-day-humid").text("Humidity: " + res.daily[2].humidity + "%");
                $("#day-two-icon").attr("src", "http://openweathermap.org/img/wn/" + res.daily[2].weather[0].icon + ".png")
                $("#day-two").removeClass("d-none");

                $("#day-three-date").text(moment().add(3, 'd').format("M/D/YYYY"))
                $("#three-day-temp").text("Temperature: " + res.daily[3].temp.day + " ℉");
                $("#three-day-humid").text("Humidity: " + res.daily[3].humidity + "%");
                $("#day-three-icon").attr("src", "http://openweathermap.org/img/wn/" + res.daily[3].weather[0].icon + ".png")
                $("#day-three").removeClass("d-none");

                $("#day-four-date").text(moment().add(4, 'd').format("M/D/YYYY"))
                $("#four-day-temp").text("Temperature: " + res.daily[4].temp.day + " ℉");
                $("#four-day-humid").text("Humidity: " + res.daily[4].humidity + "%");
                $("#day-four-icon").attr("src", "http://openweathermap.org/img/wn/" + res.daily[4].weather[0].icon + ".png")
                $("#day-four").removeClass("d-none");

                $("#day-five-date").text(moment().add(5, 'd').format("M/D/YYYY"))
                $("#five-day-temp").text("Temperature: " + res.daily[5].temp.day + " ℉");
                $("#five-day-humid").text("Humidity: " + res.daily[5].humidity + "%");
                $("#day-five-icon").attr("src", "http://openweathermap.org/img/wn/" + res.daily[5].weather[0].icon + ".png")
                $("#day-five").removeClass("d-none");










            })

        })
    })
})