var express = require('express');
var path = require('path');

function getProfile(req, res) {
    // res.sendFile(path.join(__dirname, '/test/', '../public/profile.html'));
    res.render('profile', { 'username': req.params.username});
}

module.exports = {
    getProfile
}