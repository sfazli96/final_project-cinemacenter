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

/*"name":"Fred Astaire",
"birth_name":"
Frederic Austerlitz Jr.",
"height":"177",
"bio":"Fred Astaire was born in Omaha, Nebraska, to Johanna (Geilus) and Fritz Austerlitz, a brewer. Fred entered show business at age 5. He was successful both in vaudeville and on Broadway in partnership with his sister, Adele Astaire. After Adele retired to marry in 1932, Astaire headed to Hollywood. Signed to RKO, he was loaned to MGM to appear in La danza di Venere (1933) before starting work on RKO's Carioca (1933). In the latter film, he began his highly successful partnership with Ginger Rogers, with whom he danced in 9 RKO pictures. During these years, he was also active in recording and radio. On film, Astaire later appeared opposite a number of partners through various studios. After a temporary retirement in 1945-7, during which he opened Fred Astaire Dance Studios, Astaire returned to film to star in more musicals through 1957. He subsequently performed a number of straight dramatic roles in film and TV.",
"birth_details":"May 10, 1899 in Omaha, Nebraska, USA",
"date_of_birth":"1899-05-10",
"place_of_birth":"Omaha, Nebraska, USA",
"death_details":"June 22, 1987 in Los Angeles, California, USA  (pneumonia)",
"date_of_death":"1987-06-22",
"place_of_death":"Los Angeles, California, USA",
"reason_of_death":"pneumonia",
"spouses_string":"Robyn Smith  (27 June 1980 - 22 June 1987) (his death)\nPhyllis Livingston Potter  (12 July 1933 - 13 September 1954) (her death) (2 children)",
"spouses":"2",
"divorces":"0",
"spouses_with_children":"1","children":"2"},
*/

module.exports = {
    getNames
}