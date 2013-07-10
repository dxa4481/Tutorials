/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 7/9/13
 * Time: 8:57 AM
 * To change this template use File | Settings | File Templates.
 */




var http = require('http');
var jsxml = require("node-jsxml");


exports.getweather = function (location, sendweather, returninfo){
    locationurl = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&mode=xml';
    http.get(locationurl, function(res) {
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);

            var xml = new jsxml.XML('' + chunk);
            country = xml.descendants('country').text().toString();
            temp =  xml.descendants('temperature').attribute('value').toString();
            temp = parseFloat(temp);
            temp = 9/5 * (temp - 273) + 32;
            temp = '' + temp;
            wind = xml.descendants('speed').attribute('name').toString();
            clouds = xml.descendants('clouds').attribute('name').toString();
            weather =   xml.descendants('weather').attribute('value').toString();

            var info = "The temperature in " +  location + ", " + country + " is " + temp + "f. The wind is a "
            info = info + wind + " and the cloud coverage is " + clouds + '. It is a ' + weather;

            sendweather(returninfo, info);
        })});


}