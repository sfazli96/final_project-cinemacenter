var express = require('express');
var path = require('path');
const fetch = require('node-fetch');
const jsonObj = require('../public/json/IMDb movies.json');
const ejs = require('ejs');

function getMovie(req, res) {
    // res.sendFile(path.join(__dirname, '../public/home.html'));
    // const response = await fetch("http://localhost:3000/public/json/IMDb movies.json");
    // const data = await response.json();
    // console.log(jsonObj);
    let movie = jsonObj.filter(item => item.imdb_title_id == req.params.movieID)[0];
    console.log('movie:' + movie);
    console.log('type:' + typeof(movie));
    // if (movies.length == 0)
    //     res.sendStatus(404);
    
    // else {
    //     console.log(movies);
    //     res.render('movie', {movieID: req.params.movieID});
    // }
    if (movie == null) {
        res.render('error404');
    }
    else {
        res.render('movie', { 
            'id': movie.imdb_title_id, 
            'title': movie.original_title, 
            'year': movie.year, 
            'genre': movie.genre,
            'description': movie.description,
            'avg_vote': movie.avg_vote,
            'directors': movie.director,
            'writers': movie.writer,
            'actors': movie.actors,
            'country': movie.country,
            'language': movie.language,
            'production_company': movie.production_company,
    
        });
    }

}

module.exports = {
    getMovie,
}