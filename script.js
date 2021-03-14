let cityName = "Livonia, Michigan";
let apiKey = "2bcd0da6194f544d602584886990e450";
let temperature = $('#temperature')
let humidity = $('#humidity')
let windSpeed = $('#windSpeed')
let inputCity = $("#input");
let userInput = $("")

$(document).ready(() => {
    weatherCall(cityName);
});


let time = moment().format('LLL');
$("#date").text(time);
console.log(time);

function weatherCall(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=`+city+`&appid=2bcd0da6194f544d602584886990e450&units=imperial`, data => {
        $(`#city`).text(city);
        temperature.text(`${data.main.temp}F`);
        humidity.text(`${data.main.humidity}%`);
        windSpeed.text(`${data.wind.speed} mph`);
        console.log(data);

        $.get(`http://api.openweathermap.org/data/2.5/uvi?lat=`+data.coord.lat+`&lon=`+data.coord.lon+`&appid=`+ apiKey, data => {
         console.log(data);
         $(`#UV`).text(data.value);
        });
    });
    
}

function search(form) {
    let searchInfo = form[0].value;
    }
    
    weatherCall(searchInfo);
   
// localStorage.setItem("cityName", JSON.stringify)
// search.on("click", event)
// let search = input.val()