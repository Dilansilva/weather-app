const request = require('request');

const geocode = (address, callback) => {
    const urlGeoCord = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZGlsYW5zaWx2YSIsImEiOiJjazl0eTBuY3IwMjNsM2xudTJ1emJtMDViIn0.TmZGX9pQYcr4-O1aB4G_5A&limit=1';

    request({url : urlGeoCord , json : true} ,(error, response) => {
        if(error){
            callback('Unable to connect to location service',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location',undefined);
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;