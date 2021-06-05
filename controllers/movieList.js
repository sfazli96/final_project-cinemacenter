var express = require('express');
var path = require('path');

function getmovieList(req, res) {
    console.log('rendering movie.html');
    res.render('movieList');
}

module.exports = {
    getmovieList
}