console.log("Hi there.");

var todaysDate = moment().format("dddd MMMM Do, YYYY");

$("#date").text(todaysDate);

var APIKey = "28674e263c38beb7ce19d2d42c6354dd";
var city = "denver";

// $(document).ready(function () {
//   // var city = $("#queryCity").val();
//   // retrieve the input city
//   // function getCity() {
//   //   console.log("in");
//   //   e.preventDefault();
//   // $("#submit").on("submit", getCity);
// });

function getCity() {
  event.preventDefault();
  var searchCity = $("#searchCity").val();
  var city = searchCity.toLowerCase();

  // function capitalizeFirstLetter(city) {
  //   return city.charAt(0).toUpperCase() + string.slice(1);
  // }

  var cityMain = $("#cityMain").text(city);

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  var queryURL5D =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data1) {
    console.log(data1);

    // alert("this is working");
    //   dynamically create html elements
    var mainTemp = $("#mainTempValue");
    mainTemp.text("Temperature: " + Math.floor(data1.main.temp) + " degrees F");

    var mainWind = $("#mainWindValue");
    mainWind.text("Wind Speed:  " + data1.wind.speed + " MPH");

    var mainHumidity = $("#mainHumValue");
    mainHumidity.text("Humidity: " + data1.main.humidity + "%");

    // var mainUV = $("#mainUValue");
    // mainUV.text("UV Index: " + data.main.uvi);

    $.ajax({
      url: queryURL5D,
      method: "GET",
    }).then(function (data5) {
      console.log(data5);

      function setIcon(day) {
        var iconCode = data5.list[day].weather[0].icon;
        var iconURL =
          "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        return iconURL;
      }

      function set5DayWeather(dayArray, day) {
        var temp = Math.floor(data5.list[dayArray].main.temp_max);
        $("#d" + day + "temp").text("Temperature: " + temp + " degrees F");

        var wind = Math.floor(data5.list[dayArray].wind.speed);
        $("#d" + day + "wind").text("Wind Speed: " + wind + " MPH");
        var humidity = data5.list[dayArray].main.humidity;
        $("#d" + day + "hum").text("Humidity: " + humidity + "%");
      }

      set5DayWeather(2, 1);
      set5DayWeather(10, 2);
      set5DayWeather(18, 3);
      set5DayWeather(26, 4);
      set5DayWeather(34, 5);

      $("#d1img").attr("src", setIcon(2));
      $("#d2img").attr("src", setIcon(10));
      $("#d3img").attr("src", setIcon(18));
      $("#d4img").attr("src", setIcon(26));
      $("#d5img").attr("src", setIcon(34));
    });
  });
}

function changeClock(n) {
  var addDays = moment().add(n, "d");
  var cleanup = addDays.format("MM/DD/YYYY");

  return cleanup;
}

var d1Date = $("#d1Date").text(changeClock(1));
var d2Date = $("#d2Date").text(changeClock(2));
var d3Date = $("#d3Date").text(changeClock(3));
var d4Date = $("#d4Date").text(changeClock(4));
var d5Date = $("#d5Date").text(changeClock(5));

// $("#submit").on("click", getCity);

var submit = document.getElementById("submit");
submit.addEventListener("click", getCity);

// getCity();
