var APIKey = 'dc4775af5ff7a953aa6df1dfbaf88aaf'
var city

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
