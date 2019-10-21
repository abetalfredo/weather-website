const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
//for more details, visit expressjs.com docs -> Applications
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abet Alfredo'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abet Alfredo',
        image: '/profile-pic.jpg'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abet Alfredo',
        text: 'This is a help message.'
    })
})  

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please input address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'Please provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help article not found',
        errorMessage:'The help article that you are looking for cannot be found'
    })
})

//needs to be at the end route
app.get('*',(req,res) => {
    res.render('404', {
        title: 'Oops! Something went wrong',
        errorMessage: 'The page that you are looking for cannot be found.'
    })
})

//listener
app.listen(port, () => {
    console.log('server is up on port ' + port + '...')
})