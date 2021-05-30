const express = require('express')
const ejs = require('ejs')
// const functions = require('firebase-functions')
const app = express()
const path = require('path')
const port = 3000

// set view engine (ejs)
app.set('view engine', 'ejs');

// handlers
const homeHandler = require('./controllers/home')
const registrationHandler = require('./controllers/registration')
const movieHandler = require('./controllers/movie')

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', homeHandler.getHome)
app.get('/home', homeHandler.getHome)
app.get('/registration', (req, res) => res.sendFile(path.join(__dirname, '/public/registration.html')))
app.get('/movies', (req, res) => res.sendFile(path.join(__dirname, "/public/movies.html")))
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, "/public/login.html")))

app.get('/movie/:movieID', movieHandler.getMovie);

app.get('*', (req, res) => res.status(404).send('404 ERROR: page not found'));

app.listen(port, function() { console.log("Server listening on port(" + port + ")")})

// exports.app = functions.https.onRequest(app);