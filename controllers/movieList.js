var express = require('express');
var path = require('path');

function getmovieList(req, res) {
    res.render('movieList');
}

module.exports = {
    getmovieList
}