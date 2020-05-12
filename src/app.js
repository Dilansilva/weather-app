const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'hbs');//This is will render .hbs files when res.render is called
app.set('views',viewsPath);
hbs.registerPartials(partialPath);  


app.use(express.static(publicDirectoryPath));//access to the css/images/javascript 


app.get('', (req, res) => {
    res.render('index',{
        title: 'weather',
        name: 'Dilan silva'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Dilan silva'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpfull text',
        title: 'Help',
        name: 'Dilan silva'
    });
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search item'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
    });

   
            app.get('/weather',(req,res) => {
                if(req.query.search == 0){
                    return res.send({
                        error: 'Error'
                    })
                                    }
                                    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
                                        if(error){
                                            return res.send({
                                                error: error
                                                
                                            })
                                        }
                                        forecast(latitude, longitude, (error, forecastData) => {
                                            if(error){
                                                return res.send({
                                                    error: error
                                                    
                                                })
                                            }
                                    
                                            res.send({
                                                forecast: forecastData,
                                                location,
                                                address: req.query.address
                                            });

                                          });
                                    });
                 });
         

app.get('*',(req,res) => {
    res.render('404',{
        error: 'Page not found',
        title: '404',
        name: 'Dilan silva'
    });
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        error: 'Help article not found',
        title: '404',
        name: 'Dilan silva'
    });
});





//app.com/help
// app.get('/help',(req,res) => {
//     res.send({
//         name: 'Dilan',
//         age: 24 
//     });
// });


//app.com/weather
// app.get('/weather',(req,res) => {
//     res.send({
//         forecast: 'Sunshine is shinning weather is sweet',
//         location: 'Sri lanka '
//     });
// });

app.listen(port,() => {
    console.log('Server is up to port 3000' + port);
});

