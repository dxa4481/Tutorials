/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 7/9/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */

var getweather = require('./getweather');


exports.weathercheck = function(incomingMessage, sendweather, returninfo){
    bool = false
    incomingMessage.split(' ').forEach(function imcheck(word){
        if(bool == true){
            getweather.getweather(word,sendweather,returninfo);
            bool = false
        }
        else if (word == 'weather' || word == 'Weather'){
            bool = true;
        }
    });
};