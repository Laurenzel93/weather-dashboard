let cityName = "Livonia, Michigan";
let apiKey = "2bcd0da6194f544d602584886990e450";
let temperature = $('.temperature')
let humidity = $('.humidity')
let windSpeed = $('.windSpeed')
let inputCity = $(".input");

$(document).ready(() => {
    weatherCall(cityName);
});

function weatherCall(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2bcd0da6194f544d602584886990e450&units=imperial`, data => {
        temperature.text(`${data.main.temp}F`);
        humidity.text(`${data.main.humidity}`);
        windSpeed.text(`${data.wind.speed} mph`);
    })
}

    
// localStorage.setItem("cityName", JSON.stringify)
// search.on("click", event)
// let search = input.val()