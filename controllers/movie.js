var path = require('path');
const fetch = require('node-fetch');
const jsonObj = require('../public/json/IMDb movies.json');

function getMovie(req, res) {
    // res.sendFile(path.join(__dirname, '../public/home.html'));
    // const response = await fetch("http://localhost:3000/public/json/IMDb movies.json");
    // const data = await response.json();
    // console.log(jsonObj);
    let movie = jsonObj.filter(item => item.imdb_title_id == req.params.movieID);
    
    console.log(movie);
    // if (movies.length == 0)
    //     res.sendStatus(404);
    
    // else {
    //     console.log(movies);
    //     res.render('movie', {movieID: req.params.movieID});
    // }
    res.render('movie', { movieID: 'test'});
}

module.exports = {
    getMovie
}