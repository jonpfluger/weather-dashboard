var APIKey = 'dc4775af5ff7a953aa6df1dfbaf88aaf'
var input = $('#input')
var searchButton = $('#search-button')
var card1 = $("#card1")
var card2 = $("#card2")
var card3 = $("#card3")
var card4 = $("#card4")
var card5 = $("#card5")

// click listener to search button
function searchFunction() {
    var inputValue = input.val()
    console.log(inputValue)
    localStorage.setItem("input", inputValue)
    currentWeather(inputValue)
    forecast(inputValue)

}

searchButton.on('click', searchFunction)

function currentWeather(input) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityName = data.name
            $("#city-name-results").text(cityName)
            var tempResults = "Temperature: " + Math.floor(data.main.temp) + "° F"
            $("#tempurature-results").text(tempResults)
            var windResults = "Wind Speed: " + Math.floor(data.wind.speed) + " MPH"
            $('#wind-results').text(windResults)
            var humidityResults = "Humidity: " + data.main.humidity + "%"
            $("#humidity-results").text(humidityResults)
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
                dateCard.text(moment.unix(data.list[i].dt).format("dddd"))
                var ul = $('<ul>').addClass('list-group list-group-flush')
                var temp = $('<li>').addClass('list-group-item')
                temp.text("Temp: " + Math.floor(data.list[i].main.temp) + "° F")
                var wind = $('<li>').addClass('list-group-item')
                wind.text("Wind: " + Math.floor(data.list[i].wind.speed) + " MPH")
                var humidity = $('<li>').addClass('list-group-item')
                humidity.text("Humidity: " + data.list[i].main.humidity + "%")
                ul.append(temp, wind, humidity)
                card.append(dateCard, ul)
                $('#forecast-cards').append(card)
            }
        })
}



