const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/94d80dc3849b3d7fdbfd08c26c73647d/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)
    
    request({url,json:true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback(body.error,undefined)
        } else {
            callback(undefined, {
                summary: body.daily.summary,
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast;