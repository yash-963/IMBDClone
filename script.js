// fetch elemnts
const searchInput = document.querySelector("#searchInput");
const searchMoviesList = document.querySelector("#searchMovies");
const moviesCard = document.querySelector("#moviesCard");
const singleMovieDetail = document.querySelector("#singleMovieDetail");

// load movies using API
async function loadAllMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=8924e008&s=${query}`);
    const data = await response.json();
    return data.Search || []
}

// load movie details from API
async function loadMovieDetailsAPI(id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=8924e008`);
    const data = await response.json();
    return data || {}
}


// add events listiner
searchInput.addEventListener('keyup', (event) => {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || // Check for alphabets
        (event.keyCode >= 48 && event.keyCode <= 57) || // Check for numbers from main keyboard
        (event.keyCode >= 96 && event.keyCode <= 105) || // Check for numbers from numpad) 
        event.keyCode === 8 || // Check for backspace
        event.keyCode === 46) { // Check for delete key
        loadMovieInSearch();
    }
    else if ((event.keyCode === 13)) { // Check for Enter
        displayMovieCard()
    }
})

// load list of search
function loadMovieInSearch() {
    let MovieNameInInput = (searchInput.value).trim()
    if (MovieNameInInput.length < 3) {
        searchMoviesList.textContent = ""
    }
    else {
        loadMoviesList(MovieNameInInput)
    }
}

// load movie in search
function loadMoviesList(name) {
    loadAllMovies(name).then(
        (result) => {
            showMoviesInsearch(result)
        }
    ).catch(
        err => alert('Error searching movies:', err)
    )
}
// load movie in card
function loadMoviesCard(name) {
    loadAllMovies(name).then(
        (result) => {
            showMoviesInCard(result)
        }
    ).catch(
        err => alert('Error searching movies:', err)
    )
}

// show movies in search

function showMoviesInsearch(data) {
    if (data.length > 0) {
        searchMoviesList.textContent = ""
        for (let i of data) {
            // console.log(i)
            const newDiv = document.createElement("div");
            newDiv.className = "movie bg-dark px-3";
            newDiv.addEventListener('click', () => {
                updateMovieDetails(i.imdbID)
            })
            newDiv.innerHTML = `<div class="movieName">${i.Title}</div><div class="movieYear">${i.Year}</div>`
            searchMoviesList.append(newDiv)
        }
    }
    else {
        searchMoviesList.textContent = "No Movies"
    }
}
// show movies in Card

function showMoviesInCard(data) {
    if (data.length > 0) {
        moviesCard.textContent = ""
        for (let i of data) {
            // console.log(i)
            const newDiv = document.createElement("div");
            newDiv.className = "card mt-3";
            newDiv.style.width = "18rem";
            newDiv.innerHTML = `<img src="${i.Poster}" class="card-img-top img-fluid" alt="${i.Title}"><div class="card-body"><h5 class="card-title">${i.Title}</h5><p class="card-text">Year: ${i.Year}</p><p class="card-text">Type: ${i.Type}</p><a class="btn btn-primary" onclick="updateMovieDetails('${i.imdbID}')">Know More</a><a class="btn btn-primary ms-2" onclick="updateItemsInLocalStorage('${i.imdbID}')">Add Fav</a>
            </div>`
            moviesCard.append(newDiv)
        }
    }
    else {
        moviesCard.textContent = "No Movies"
    }
}

// if user click on search
function displayMovieCard() {
    let MovieNameInInput = (searchInput.value).trim();
    searchMoviesList.textContent = ""
    // singleMovieDetail.textContent = ""
    if (MovieNameInInput.length < 3) {
        alert("enter atleat 3 character")
    }
    else {
        loadMoviesCard(MovieNameInInput)
    }
}

// update selected movie details
function updateMovieDetails(id) {
    let url = `movie.html?imdbID=${id}`;
    window.location.href = url;
}

// Function to retrieve the array from local storage or return an empty array if not present
function getItemsFromLocalStorage() {
    var items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
}

// Function to update the array in local storage
function updateItemsInLocalStorage(items) {
    let arr = getItemsFromLocalStorage()
    if (arr.includes(items)) {
        alert("already added in Fav")
    }
    else {
        alert("added in Fav")
        arr.push(items)
    }
    localStorage.setItem("items", JSON.stringify(arr));
    console.log(getItemsFromLocalStorage())
}

// localStorage.clear();