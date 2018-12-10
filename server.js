const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //Heroku setup

var app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `NOW: ${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to log file');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>
{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (value) => {
    return value.toUpperCase();
});

app.get('/', (req, res) => 
{
    var data = {
        pageTitle: 'My Home Page',
        welcomeMessage: 'Welcome to my website'
    };

    res.render('home.hbs', data);
});

app.get('/about', (req, res) => {
    var data = {
        pageTitle: 'My About Page'
    };

    res.render('about.hbs', data);    
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Page'
    });
});

app.listen(port, () => 
{
    console.log(`Running on port ${port}`);
});