var express = require('express');
var path = require('path');

function getactorList(req, res) {
    console.log('rendering actors.html');
    res.render('actorList');
}

module.exports = {
    getactorList
}