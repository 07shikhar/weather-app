const request = require('request')
// const url = 'http://api.weatherstack.com/current?access_key=43177dbf4b6067a4a2ae4fb41bfcdfe6&query=37.8267,-122.4233'
// // request({url: url}, (error, response)=>{ //response is string representation of JSON
// //     const data = JSON.parse(response.body)
// //     console.log(data.current)
// // }) manual parsing of JSON data received by API

forecast = (lat, lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=43177dbf4b6067a4a2ae4fb41bfcdfe6&query='+ lat + ',' + lon

    request({url: url, json: true}, (error, response)=>{
        if (error){
            callback('Unable to connect to API', undefined)
        }
        else if(response.body.error){
            console.log('Unable to find location', undefined)
        }
        else{
            const rBdy = response.body.current
            callback(undefined, 'The temperature is ' + rBdy.temperature + 'C feels like ' + rBdy.feelslike + 'C')

        }
    
    })
}

module.exports = forecast