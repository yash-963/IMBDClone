// load movie details from API
async function loadMovieDetailsAPI(id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=8924e008`);
    const data = await response.json();
    return data || {}
}

// works on load of the page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('imdbID')
    if (id) {
        loadMovieDetailsAPI(id).then(
            (result) => {
                const newDiv = document.createElement("div");
                newDiv.className = "movieDetailMainDiv d-flex justify-content-center";
                newDiv.innerHTML = `<div class="moviePoster"><img src="${result.Poster}" class="img-fluid"></div>
                <div class="movieDetails text-white px-3"><h2>${result.Title}</h2><div class="d-flex gap-2 align-items-center mt-3"><p><b>Year: </b>${result.Year}</p><p class="rating"><b>Ratings: </b>${result.imdbRating}</p><p><b>Released: </b>${result.Released}</p></div>
                <p class="mt-1"><b>Runtime: </b>${result.Runtime}</p>
                <div class="mt-2 p-2 Genere">
                    <p class="mb-0"><b>Genere: </b>${result.Genre}</p>
                </div>
                <p class="mt-3"><b>Writer: </b>${result.Writer}</p>
                <p class="mt-3"><b>Cast: </b>${result.Actors}</p>
                <p class="mt-3"><b>Plot: </b>${result.Plot}</p>
                <p class="mt-3 colorYellow"><b>Language: </b>${result.Language}</p>
            </div>`
                singleMovieDetail.append(newDiv);
            }
        ).catch(err => alert('Error Movie details:', err))
    }
})