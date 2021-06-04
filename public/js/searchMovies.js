const search = document.getElementById('searchbar');
const matchList = document.getElementById('match-list');


// Search IMDb movies.json and filter it 
const searchMovies = async searchText => {
    const res = await fetch('json/IMDb movies.json');
    const movies = await res.json();

   // console.log(movies);

   // Get match to current text input 
   let matches = movies.filter(movie => {
       const regex = new RegExp(`^${searchText}`, 'gi');
       return movie.original_title.match(regex) || movie.year.match(regex);   // Match the movie title and the movie year
   });

   if (searchText.length === 0) {
       matches =[]; //Changes back to empty array
       matchList.innerHTML =''; // This clears our search engine html, clears it
   }

   // sort by release date
   matches = matches.sort(function(a, b) {
       return a.year > b.year ? -1 : 1;
   })
   console.log(matches);

   outputHtml(matches);      // This outputs the Html which how the regex matches
};

// Show the results in HTML 
const outputHtml = matches => {
    if (matches.length > 0) {
            const html = matches.map(match => `
                <div class="card card-custom">
                    <div class="card-body card-body-custom">
                        <h5 class="card-title">${match.original_title} (${match.year})</h5>
                        <p class="card-text">${match.description}</p>
                        <a href="/movie/${match.imdb_title_id}" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        `).join('')
         //   console.log(html);
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchMovies(search.value));

