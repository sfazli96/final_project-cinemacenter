const express = require('express')
// const functions = require('firebase-functions')
const app = express()
const path = require('path')
const port = 3000

// handlers
const homeHandler = require('./controllers/home')
const registrationHandler = require('./controllers/registration')

app.use(express.static(path.join(__dirname, 'public')))

// app.get('/registration', registrationHandler.getRegistration)

app.get('/registration', (req, res) => res.sendFile(path.join(__dirname, '/public/registration.html')))

app.get('/', homeHandler.getHome);
app.get('/home', homeHandler.getHome);

app.get('*', (req, res) => res.status(404).send('404 ERROR: page not found'));

app.listen(port, function() { console.log("Server listening on port(" + port + ")")})

// exports.app = functions.https.onRequest(app);