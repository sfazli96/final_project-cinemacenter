//const csvtojson = require(['csvtojson'])
//const fs = require('fs') // filesystem

const search = document.getElementById('searchbar');
const matchList = document.getElementById('match-list');
//const csvfilepath = "IMDb movies.csv"


/*csvtojson()
.fromFile(csvfilepath)
.then((json) => {
    console.log(json)

    fs.writeFileSync("IMDb movies.json", JSON.stringify(json), "utf-8",(err) => {
        if(err)
            console.log(err)
    })
})
*/


// Search IMDb movies.json and filter it 
const searchMovies = async searchText => {
    const res = await fetch('json/IMDb movies.json');
    const movies = await res.json();

   // console.log(movies);

   // Get match to current text input 
   let matches = movies.filter(movie => {
       const regex = new RegExp(`^${searchText}`, 'gi');
       return movie.title.match(regex) || movie.year.match(regex);   // Match the movie title and the movie year
   });

   if(searchText.length === 0) {
       matches =[]; //Changes back to empty array
       matchList.innerHTML =''; // This clears our search engine html, clears it
   }

   console.log(matches);

   outputHtml(matches);      // This outputs the Html which how the regex matches
};

// Show the results in HTML 
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>Title: ${match.title} Release Date: (${match.year}) Description: ${match.description} Genre: ${match.genre} <span class="text-primary">${match.capital}
            </span></h4>
        </div>
        `).join('')
         //   console.log(html);
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchMovies(search.value));

