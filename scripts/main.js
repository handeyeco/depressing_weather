// &APPID=061f24cf3cde2f60644a8240302983f2

$(function () {
	function WeatherQuery (city, region, country, curTemp, weather, high, low) {
		this.city = city;
		this.region = region;
		this.country = country;
		this.curTemp = Math.floor(curTemp);
		this.weather = weather;
		this.high = Math.floor(high);
		this.low = Math.floor(low);

		this.degrees = "fahrenheit";
		this.curTempC = this.convertToC(this.curTemp);
		this.highC = this.convertToC(this.high);
		this.lowC = this.convertToC(this.low);
	}

	WeatherQuery.prototype.returnIcon = function() {
		return this.weather == "Clear" ? '<i class="fa fa-sun-o" aria-hidden="true"></i>' : '<i class="fa fa-cloud" aria-hidden="true"></i>';
	};

	WeatherQuery.prototype.convertToC = function(temp) {
		return Math.floor((temp - 32) * .5556);
	};

	var owmAPI;
	var geoAPI;
	var localQuery;
	$.getJSON("http://ip-api.com/json", function(result) {
		geoAPI = result;
		owmAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + result.lat + "&lon=" + result.lon + "&units=imperial&APPID=061f24cf3cde2f60644a8240302983f2";

		$.getJSON(owmAPI, function(result){
	    localQuery = new WeatherQuery(
	    	geoAPI.city,
	    	geoAPI.region,
	    	geoAPI.countryCode,
	    	result.main.temp,
	    	result.weather[0].main,
	    	result.main.temp_max,
	    	result.main.temp_min
	    );

	    $("#local-location").text(localQuery.city + ", " + localQuery.region);
	    $("#local-temp").html(localQuery.returnIcon() + localQuery.curTemp + "\xBA");
	    $("#local-details").html(localQuery.weather + ", " + localQuery.degrees);
	    $("#local-container").fadeIn("slow");
	  });
	});

  $("#local-container").click(function() {
  	$("#local-container").fadeOut("slow", function () {
  		if (localQuery.degrees == "fahrenheit"){
  			localQuery.degrees = "celsius";
  			$("#local-temp").html(localQuery.returnIcon() + localQuery.curTempC + "\xBA");
    		$("#local-details").html(localQuery.weather + ", " + localQuery.degrees);
  		} else {
  			localQuery.degrees = "fahrenheit";
  			$("#local-temp").html(localQuery.returnIcon() + localQuery.curTemp + "\xBA");
    		$("#local-details").html(localQuery.weather + ", " + localQuery.degrees);
  		}
  	}).fadeIn("slow");
  })
});
















