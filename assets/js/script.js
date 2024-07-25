var APIKey = 'dc4775af5ff7a953aa6df1dfbaf88aaf'
var input = $('#input')
var searchButton = $('#search-button')
var clearButton = $('#clear-button')
var pastSearches = $('#past-searches')

// local storage
function getLocalStorage() {
    var localInputStorage = localStorage.getItem("input");
    var pastSearchEl = $("<p>").text(localInputStorage);
    pastSearches.append(pastSearchEl)
}

getLocalStorage()

// click listener to search button
function searchFunction() {
    var inputValue = input.val()
    console.log(inputValue)
    currentWeather(inputValue)
    forecast(inputValue)
    localStorage.setItem("input", inputValue)
    var localInputStorage = localStorage.getItem("input")
    var pastSearchEl = $("<p>").text(localInputStorage)
    pastSearches.append(pastSearchEl)
    input.val("")
}

// searchButton.on('click', searchFunction)

function currentWeather(input) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityName = data.name
            var icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            $("#city-name-results").text(cityName + " " + moment().format('MM/DD/YY'))
            $('#weather-icon').attr("src", icon)
            var tempResults = "Temperature: " + Math.floor(data.main.temp) + "° F"
            $("#tempurature-results").text(tempResults)
            var windResults = "Wind Speed: " + Math.floor(data.wind.speed) + " MPH"
            $('#wind-results').text(windResults)
            var humidityResults = "Humidity: " + data.main.humidity + "%"
            $("#humidity-results").text(humidityResults)
        })
        .catch(error => {
            console.log(error)
            alert("Error 404: Not Found")
            input.val("")
        })
}

function forecast(input) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (var i = 4; i < data.list.length; i += 8) {
                var card = $('<div>').addClass('card col-2')
                var dateCard = $('<h5>').addClass('card-header')
                var icon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
                dateCard.text(moment.unix(data.list[i].dt).format("dddd"))
                var cardIcons = $('<img>').attr("src", icon).addClass('card-img-icons')
                var ul = $('<ul>').addClass('list-group list-group-flush')
                var temp = $('<li>').addClass('list-group-item')
                temp.text("Temp: " + Math.floor(data.list[i].main.temp) + "° F")
                var wind = $('<li>').addClass('list-group-item')
                wind.text("Wind: " + Math.floor(data.list[i].wind.speed) + " MPH")
                var humidity = $('<li>').addClass('list-group-item')
                humidity.text("Humidity: " + data.list[i].main.humidity + "%")
                ul.append(temp, wind, humidity)
                card.append(dateCard, cardIcons, ul)
                $('#forecast-cards').append(card)
            }
        })
}

function clearSearch(e) {
    e.preventDefault()
}

// event listeners
searchButton.on('click', searchFunction)
clearButton.on('click', clearSearch)