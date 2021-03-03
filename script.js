let city = "Livonia, Michigan";

$(document).ready(() => {
    $.get("api.openweathermap.org/data/2.5/weather?q=Livonia&appid=2bcd0da6194f544d602584886990e450" , data =>{
    console.log(data);
    })
});
