var express = require('express');
var path = require('path');

function getLogin(req, res) {
    // res.sendFile(path.join(__dirname, '../public/registration.html'));
    //res.sendFile(path.join(__dirname, '/test/', '../public/registration.html'));
    console.log('rendering login.html');
    res.render('login');
}

module.exports = {
    getLogin
}