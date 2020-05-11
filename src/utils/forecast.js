const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const urlForcast = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+ longitude +'&exclude=current&appid=5c301eacf55ba92acebe2c2d52aebe38';
    
    request({url : urlForcast,json : true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(response.body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,
            response.body.hourly[1].weather[0].description + '.It is currently ' +  (response.body.hourly[1].temp -(272.5)) + ' degress out.'
            );
        }
    });
    
}

module.exports = forecast;
