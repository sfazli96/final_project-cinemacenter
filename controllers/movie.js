var path = require('path');

function getMovie(req, res) {
    // res.sendFile(path.join(__dirname, '../public/home.html'));
    console.log(req.params.movieID);
    res.render('movie', {movieID: req.params.movieID});
}

module.exports = {
    getMovie
}