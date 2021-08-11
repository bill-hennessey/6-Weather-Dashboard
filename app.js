console.log("Hi there.");

// formatiing and populating todays date
var todaysDate = moment().format("dddd MMMM Do, YYYY");

$("#date").text(todaysDate);

var APIKey = "28674e263c38beb7ce19d2d42c6354dd";

function getCity() {
  event.preventDefault();
  var searchCity = $("#searchCity").val();

  var city = searchCity.toLowerCase();
  var savedCities = localStorage.getItem("history");

  if (savedCities === null) {
    // create the array
    savedCities = [];
    // add to the array
    savedCities.unshift(city);

    // make the array a JSON string
    JSON.stringify(savedCities);

    // send the string array to localstorage
    localStorage.setItem("history", savedCities);
  }

  // else if (savedCities.length < 6) {
  //   var savedCities = localStorage.getItem("history");
  //   JSON.parse(savedCities);

  //   savedCities.unshift(city);

  //   localStorage.setItem("history", JSON.stringify(savedCities));
  // } else {
  //   return;
  // }

  // places search query into the main city text
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

  // first ajax call for current weather
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data1) {
    console.log(data1);

    // applying gathered temp, wind, and humidity
    // **** UV index is depracated as of 4/1/21 *****
    var mainTemp = $("#mainTempValue");
    mainTemp.text("Temperature: " + Math.floor(data1.main.temp) + " degrees F");

    var mainWind = $("#mainWindValue");
    mainWind.text("Wind Speed:  " + data1.wind.speed + " MPH");

    var mainHumidity = $("#mainHumValue");
    mainHumidity.text("Humidity: " + data1.main.humidity + "%");

    // second ajax call for 5 day forcast
    $.ajax({
      url: queryURL5D,
      method: "GET",
    }).then(function (data5) {
      console.log(data5);

      // grab the icon from the 5 day forcast data and place it in the corresponding div
      function setIcon(day) {
        var iconCode = data5.list[day].weather[0].icon;
        var iconURL =
          "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        return iconURL;
      }
      // function to apply all temp, wind and humidity to the 5 divs
      function set5DayWeather(dayArray, day) {
        var temp = Math.floor(data5.list[dayArray].main.temp_max);
        $("#d" + day + "temp").text("Temperature: " + temp + " degrees F");

        var wind = Math.floor(data5.list[dayArray].wind.speed);
        $("#d" + day + "wind").text("Wind Speed: " + wind + " MPH");
        var humidity = data5.list[dayArray].main.humidity;
        $("#d" + day + "hum").text("Humidity: " + humidity + "%");
      }

      // calling the functions and args to grab the correct data from the 5 day data
      set5DayWeather(5, 1);
      set5DayWeather(13, 2);
      set5DayWeather(21, 3);
      set5DayWeather(29, 4);
      set5DayWeather(37, 5);

      $("#d1img").attr("src", setIcon(5));
      $("#d2img").attr("src", setIcon(13));
      $("#d3img").attr("src", setIcon(21));
      $("#d4img").attr("src", setIcon(29));
      $("#d5img").attr("src", setIcon(37));
    });
  });
}
// setting correct dates in the 5D
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

// event handler for the submit button which runs the main getCity function
$("#submit").on("click", getCity);
