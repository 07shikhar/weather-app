const request = require('request')
const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiOTlzaGlraGFyIiwiYSI6ImNrdzRlNnRiaDA1cHIydWxqNzk5ZzY0dzIifQ.2ZA0e8MygGAl5OTcOMOM9g&limit=1'

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to API', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode