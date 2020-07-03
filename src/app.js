const path = require ('path');
const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('../src/utils/geocode');
const forecast = require ('../src/utils/forecast');


const app = express ()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars and views location
app.set ('view engine','hbs');
app.set ('views',viewsPath);
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use (express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render ('index', {
        title: 'Weather App',
        name: 'Alexandre Costa'
    })
})

app.get('/about', (req, res)=>{
    res.render ('about',{
        title: 'About me',
        name: 'Alexandre Costa'
    })
})

app.get('/help', (req, res)=>{
    res.render ('help',{
        title: 'About me',
        name: 'Alexandre',
        helpText: 'help Menu'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please Provide a valid Adress'
        })
    }
    
    geocode (req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) return res.send ({
            error
        })
        else {
         forecast(latitude,longitude, (error, forecastData) => {
             if (error) return res.send ({
                error
            })
            res.send ({
                forecast: forecastData.descriptions,
                location,
                address: req.query.address,
                temperature: forecastData.temperature,
                feelslike: forecastData.feelslike
            });
         })
        }
     });
})

app.get('/products', (req ,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a Search term'
        })
    }
    console.log(req.query.search);
    res.send ({
        products: []
    })
})

app.get ('/help/*',(req,res) => {
    res.render ('404',{
        title: '404',
        name: 'Alexandre Costa',
        errorMessage: 'Help article not found'
    });
})

// Tem de ficar em ultimo - verifica primeira as outra e só depois está
app.get ('*' , (req,res) => {
    res.render ('404', {
        title: '404',
        name: 'Alexandre Costa',
        errorMessage: 'Page Not found'
    });
})

//Inicia o Server
app.listen (3000, () => {
    console.log ('Server is up on Port 3000.');
})