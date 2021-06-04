var path = require('path');
const fetch = require('node-fetch');
const jsonObj = require('../public/json/IMDb names.json');
const ejs = require('ejs');

function getNames(req, res) {
    // res.sendFile(path.join(__dirname, '../public/home.html'));
    // const response = await fetch("http://localhost:3000/public/json/IMDb movies.json");
    // const data = await response.json();
    // console.log(jsonObj);
    let name = jsonObj.filter(item => item.imdb_name_id == req.params.nameID)[0];
    console.log(name);
    // if (movies.length == 0)
    //     res.sendStatus(404);
    
    // else {
    //     console.log(movies);
    //     res.render('movie', {movieID: req.params.movieID});
    // }
    res.render('name', { 
        'id': name.imdb_name_id, 
        'name': name.name, 
        'height': name.height,
        'bio': name.bio, 
        
    });
}

module.exports = {
    getNames
}