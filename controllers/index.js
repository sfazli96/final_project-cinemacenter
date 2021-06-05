var express = require('express');
var path = require('path');

function getHome(req, res) {
    console.log('rendering index.html');
    res.render('index');
}

module.exports = {
    getHome
}