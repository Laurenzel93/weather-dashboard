let cityName = "Livonia, Michigan";
let apiKey = "2bcd0da6194f544d602584886990e450";
let temperature = $('#temperature')
let humidity = $('#humidity')
let windSpeed = $('#windSpeed')
let inputCity = $("#input");
let userInput = $("");
let icon = $("#icon");

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
        humidity.text(`Humidity: ${data.main.humidity}%`);
        windSpeed.text(`Wind Speed: ${data.wind.speed} mph`);
        icon.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
        console.log(data);

        $.get(`http://api.openweathermap.org/data/2.5/uvi?lat=`+data.coord.lat+`&lon=`+data.coord.lon+`&appid=`+ apiKey, data => {
         console.log(data);
         $(`#UV`).text(`UV Index: ${data.value}`);
         if (parseInt(data.value) <= 4) {
            $("#UV").addClass("badge, badge-success")
          } else if (parseInt(data.value) >= 7) {
            $("#UV").addClass("badge, badge-danger")
          } else {
            $("#UV").addClass("badge, badge-warning")
          }
        });

        $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=` +data.coord.lat+`&lon=`+data.coord.lon+ `&units=imperial&appid=`+ apiKey, data => {
            console.log(data);
            for (i=1; i<6; i++) {
                $("#date"+i).text(moment().add(i, "days").format('LL'));
                $("#temp"+i).text(data.daily[i].temp.day + "F");
                $("#humidity"+i).text("Humidity: " + data.daily[i].humidity + "%");
                $("#icon"+i).attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
            }
        })

    });
    
}

$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    let city = $("#input").val().trim();
    console.log(city);
    return weatherCall(city);
});

$("#searchForm").on("submit", function () {
    let cityName = $("#input").val().trim();
  
    if (!cityName) {
      return console.log("test")
    } else {
      const recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || [];
      if (!(recentSearch.indexOf(cityName) > -1)) {
        recentSearch.push(cityName);
        localStorage.setItem("recentSearch", JSON.stringify(recentSearch)); 
      }
      return drawRecentSearch(recentSearch)
    }
  })
  
  let drawRecentSearch = function (recentSearch) {
    $("#previousSearches").empty();
    for (i=0; i<recentSearch.length; i++) {
      $("#previousSearches").append($("<button></button>").text(recentSearch[i]).attr("id", "previousButton" + i).addClass("previousButton btn btn-outline-dark mt-2"));
    }
    $(".previousButton").each(function () {
      $(this).on("click", function () {
        $("#input").val($(this).text());
        $('#searchForm').submit();
      })
    })
  }
  
  function init () {
    const recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || []; 
    if (JSON.parse(localStorage.getItem("recentSearch"))) {
      drawRecentSearch(recentSearch);
    }
  }
  
  init();
  


   
