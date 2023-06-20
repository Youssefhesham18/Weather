let searchInput = document.querySelector(".searchInput")
console.log(searchInput);
let weatherAPIKey = '0aa69a546e5b4619a1a180355232302';
let weatherBaseEndpoint = 'http://api.weatherapi.com/v1/forecast.json?key='+weatherAPIKey;
let weatherContent = document.querySelector(".forecast-table")
// let contactContent = document.querySelector(".contact")
let searchvalue = document.querySelector("#searchvalue")
let city='New York'
var months = {
    "01": "Fanuary",
    "02": "February",
    "03": "Mars",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Septemper",
    "10": "October",
    "11": "November",
    "12": "December",
}

var days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wendesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

getCurrentWeather(city);
getTommorowWeather(city);
getDay3Weather(city);
async function getCurrentWeather(city){
    let endpoint = weatherBaseEndpoint + '&q='+ city +'&days=3&aqi=no&alerts=no';
    let res =await fetch(endpoint)
    let weather =await res.json();
    let weatherForecast = weather.forecast.forecastday[0];
    let cityTime = weatherForecast.date
    let monthNum = cityTime.toString().substring(5,7)
    let dayNum = cityTime.toString().substring(8,10)
    var day = new Date()
    $(".current .degree-icon img").attr("src","https://"+weather.current.condition.icon)
    $(".location").html(weather.location.name)
    $(".current .degree-num").html(`${weather.current.temp_c}<sup>o</sup>C`)
    $(".current .custom").html(weather.current.condition.text)
    $(".current .wind span").html(weather.current.wind_kph+"km/h")
    $(".today").html(days[day.getDay()])
    $(".date").html(dayNum + ' ' + months[monthNum])
}


async function getTommorowWeather(city){
    let endpoint = weatherBaseEndpoint + '&q='+ city +'&days=3&aqi=no&alerts=no';
    let res =await fetch(endpoint)
    let weather =await res.json();
    let weatherForecast = weather.forecast.forecastday[1];
    let day = new Date()
    let dayCondition = weatherForecast.day.condition.text
    $("#day2").html(days[day.getDay() +1])
    $(".tmw img").attr("src","https://"+weatherForecast.day.condition.icon)
    $('.forecast-content #day2').html(dayCondition)
    $("#tmw-degree").html(`${weatherForecast.day.maxtemp_c}<sup>o</sup>C`)
    $('.forecast-content .lowday2').html(`${weatherForecast.day.mintemp_c}<sup>o</sup>`)
}

async function getDay3Weather(city){
    let endpoint = weatherBaseEndpoint + '&q='+ city +'&days=3&aqi=no&alerts=no';
    let res =await fetch(endpoint)
    let weather =await res.json();
    let weatherForecast = weather.forecast.forecastday[2];
    let day = new Date()
    $("#day3").html(days[day.getDay() +2])
    $(".after img").attr("src","https://"+weatherForecast.day.condition.icon)
    let dayCondition = weatherForecast.day.condition.text
    $('.forecast-content #day3').html(dayCondition)
    $("#after-degree").html(`${weatherForecast.day.maxtemp_c}<sup>o</sup>C`)
    $('.forecast-content .lowDay3').html(`${weatherForecast.day.mintemp_c}<sup>o</sup>`)
}

searchInput.addEventListener("keyup", async function displayWeather() {

    await getCurrentWeather(searchInput.value)
    await getTommorowWeather(searchInput.value)
    await getDay3Weather(searchInput.value)
} ) 
