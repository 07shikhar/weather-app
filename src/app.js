const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { RSA_NO_PADDING, RSA_PKCS1_OAEP_PADDING } = require('constants')
const { error } = require('console')

const publicDirectoryPath = path.join(__dirname, '../public') //to get the path in a variable
const viewsPath = path.join(__dirname, '../templates/views')//path for the changed name of Views
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath)) //static ditrectory that gonna make up for all our websites. It will load index.html at localhost:3000/index.html

app.set('view engine', 'hbs')
app.set('views', viewsPath)//setting the path to the changed name
hbs.registerPartials(partialPath)//path for partials



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shikhar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name:'Shikhar'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        message: 'How may I help you!!',
        name: 'Shikhar'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Cannot found'
        })
    }

    geocode(req.query.address,(error, {lat, lon, name} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(lat, lon,(error, forecastData)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast: forecastData,
                name,
                address: req.query.address
            })

        })

    })

})

app.get('/help/*', (req, res)=>{ //must come at the end. * is for any route except mentioned routes
    res.render('404',{
        title: '404',
        errMsg: 'Help Data Page Not Found',
        name: 'Shikhar'
    })
})

app.get('*', (req, res)=>{ //must come at the end. * is for any route except mentioned routes
    res.render('404',{
        title: '404',
        errMsg: 'Page Not Found',
        name: 'Shikhar'
    })
})
app.listen(port,()=>{
    console.log('Server is running on ' + port)
})