const request = require ('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5db0883415e19caa92038d2a4287c7e1&query='+latitude+','+longitude+''
    request({ url, json: true }, (error, {body}) => {
        //const data = JSON.parse(response.body)
        if (error) {
            callback("error message", undefined);
        }
        else if (body.error){
            callback('Unable to find Location',undefined);
        }
        else {
            callback(undefined, {
                descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast;

