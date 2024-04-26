// definng empty array of fav movies
let ids = []

// Function to retrieve the array from local storage or return an empty array if not present
function getItemsFromLocalStorage() {
    var items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
}

// fetching element
const favMainContainer = document.querySelector("#favMainContainer")

// load movie details from API
async function loadMovieDetailsAPI(id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=8924e008`);
    const data = await response.json();
    return data || {}
}


// show list of fav Movies
document.addEventListener('DOMContentLoaded', () => {
    ids = getItemsFromLocalStorage()
    rendorFavMovies()
})

// for renderring movies
function rendorFavMovies() {
    favMainContainer.textContent = "";
    if (ids.length == 0) {
        favMainContainer.textContent = "No movies added to Fav";
        favMainContainer.className = "text-white p-3"
    } else {
        for (let i of ids) {
            loadMovieDetailsAPI(i).then((result) => {
                const newDiv = document.createElement("div");
                newDiv.className = "card mt-3";
                newDiv.style.width = "18rem";
                newDiv.innerHTML = `<img src="${result.Poster}" class="card-img-top img-fluid" alt="${result.Title}"><div class="card-body"><h5 class="card-title">${result.Title}</h5><p class="card-text">Year: ${result.Year}</p><p class="card-text">Type: ${result.Type}</p><a class="btn btn-primary" onclick="updateMovieDetails('${result.imdbID}')">Know More</a><a class="btn btn-primary ms-1" onclick="removeFromFav('${result.imdbID}')">Remove fav</a>
                </div>`;
                favMainContainer.append(newDiv)
            }).catch(err => alert('Error Movie details:', err))
        }
    }
}

// update selected movie details
function updateMovieDetails(id) {
    let url = `movie.html?imdbID=${id}`;
    window.location.href = url;
}

// to remove from fav
function removeFromFav(id) {

    ids = ids.filter((elem) => {
        if (elem != id) {
            return elem
        }
    })
    localStorage.setItem("items", JSON.stringify(ids));
    alert("removed from fav")
    rendorFavMovies()
    console.log(getItemsFromLocalStorage())
}