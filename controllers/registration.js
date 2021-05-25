var express = require('express');
var path = require('path');

function getRegistration(req, res) {
    res.sendFile(path.join(__dirname, '../public/registration.html'));
}

module.exports = {
    getRegistration
}