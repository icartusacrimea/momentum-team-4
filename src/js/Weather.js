var Weather = (function () {

  'use strict';

  function getWeather() {
  
   $.getJSON("http://ip-api.com/json", function(data2){
      var lat = data2.lat;
      var lon = data2.lon;
      //$("#data").html("Lattitude = " + lat + "<br> Longitude = " + lon);
     
      var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=f42f0a6dd3ff2b1b9e8d3e1e434b8ad1";
    
    $.getJSON(weatherApi, function(data){
      var city = data.name;
      var temp = (data.main.temp);
      var tempF = Math.round(temp * 9/5 - 459.67);
      var tempC = Math.round(temp - 273.15);
      var listF = tempF + " &#176;";
      var listC = tempC + " &#176;";
      var country = data.sys.country;
      var code = data.weather[0].id;
      
      $("#weatherLocation").html(city + ", " + country);
      $("#weatherTemperature").html(listF);
      //add icon
      $("#weatherIcon").addClass("wi wi-owm-" + code);
      $("#temporary").html(code);

      $("#unit").on("click", function(){      
       if (toggle === false){
         $("#temp").html(listC);
         toggle = true;
       }
       else {
         $("#temp").html(listF);
         toggle = false;
       }
      
      });
    });

  }

  function init() {
    getWeather();
  }

  return {
    init: init
  };

}());