// &APPID=061f24cf3cde2f60644a8240302983f2
var measurement = "Fahrenheit",
weatherObjects = [];


var currLoc = {
	getLocation: function () {
		$.getJSON("http://ip-api.com/json",
		function (result) {
			currLoc.latitude = result.lat;
			currLoc.longitude = result.lon;
			currLoc.city = result.city;
			currLoc.region = result.region;
			weatherQuery(currLoc);
		});
	}
}

function weatherQuery (currLoc) {
	var owmLocal = "http://api.openweathermap.org/data/2.5/weather?lat=" + currLoc.latitude + "&lon=" + currLoc.longitude + "&units=imperial&APPID=061f24cf3cde2f60644a8240302983f2";
	var owmCold = "http://api.openweathermap.org/data/2.5/weather?lat=" + -78.463889 + "&lon=" + 106.8375 + "&units=imperial&APPID=061f24cf3cde2f60644a8240302983f2";
	var owmHot = "http://api.openweathermap.org/data/2.5/weather?lat=" + 14.238611 + "&lon=" + 40.293889 + "&units=imperial&APPID=061f24cf3cde2f60644a8240302983f2";

	$.getJSON(owmLocal, function (result) {
		weatherObjects[0] = new WeatherStat ("#local-weather", currLoc, result);
		updateSection(weatherObjects[0]);
	});
	$.getJSON(owmCold, function (result) {
		weatherObjects[1] = new WeatherStat ("#cold-weather", {city: "Vostok", region: "Antarctica"}, result);
		updateSection(weatherObjects[1]);
	});
	$.getJSON(owmHot, function (result) {
		weatherObjects[2] = new WeatherStat ("#hot-weather", {city: "Dallol", region: "Ethiopia"}, result);
		updateSection(weatherObjects[2]);
	});
}

function WeatherStat (selector, location, weather) {
	this.selector = selector;
	this.city = location.city;
	this.region = location.region;
	this.weather = weather.weather[0].main;
	this.tempF = Math.floor(weather.main.temp);
	this.tempC = Math.floor((this.tempF - 32) * .5556);
}

WeatherStat.prototype.getTemp = function () {
	return measurement == "Fahrenheit" ? this.tempF : this.tempC;
}

WeatherStat.prototype.getIcon = function () {
	return this.weather == "Clear" ? '<i class="fa fa-sun-o" aria-hidden="true"></i>' : '<i class="fa fa-cloud" aria-hidden="true"></i>';
}

function updateSection (weatherObj) {
	var $section = $(weatherObj.selector);
	$section.children(".location").text(weatherObj.city + ", " + weatherObj.region);
	$section.children(".temp").html(weatherObj.getIcon() + weatherObj.getTemp() + "\xBA");
	$section.children(".weather").html(weatherObj.weather + ", " + measurement);
	$section.fadeIn("slow");
}

$(function () {
	currLoc.getLocation();

	$("section").click(function () {
		$("section").fadeOut("slow", function () {
			measurement = measurement == "Fahrenheit" ? "Celsius" : "Fahrenheit";
			weatherObjects.forEach(function (e) { updateSection (e); });
		});
	});
});









