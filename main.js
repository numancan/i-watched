const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-input");
const resultList = document.querySelector(".result-list");
const watchedList = document.querySelector(".watched-list");
const watchedCount = document.querySelector(".watched-count");

const handleSearch = () => {
  let input = searchInput.value;
  resultList.innerHTML = "";

  fetch(`http://www.omdbapi.com/?s=${input}&apikey=e8381870`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      let movies = res.Search || [];
      movies.forEach(movie => {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e8381870`)
          .then(res => {
            return res.json();
          })
          .then(res => {
            res.Poster =
              res.Poster == "N/A" ? "images/no-image.png" : res.Poster;
            console.log(res.Poster);
            addMovieToResultList(res);
          });
      });
    });

  function addMovieToResultList(movie) {
    let element = document.createElement("li");
    element.classList.add("result");
    element.addEventListener("click", () => addToWatchedList(movie));

    element.innerHTML += `<img src=${movie.Poster}>
                          <div class="result__holder">
                          <p class="title">${movie.Title}</p>
                          <span class="year"> (${movie.Year})</span>
                          <p class="genre">${movie.Genre}</p></div>`;

    resultList.appendChild(element);
  }
};

async function getWatchedFromStorge() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i).split("iw-")[1];

    if (key != undefined) {
      let response = await fetch(
        `http://www.omdbapi.com/?i=${key}&apikey=e8381870`
      );
      let data = await response.json();
      addToWatchedList(data);
    }
  }
}

const addToWatchedList = movie => {
  let element = document.createElement("li");
  element.classList.add("watched");

  element.innerHTML += `<img src=${movie.Poster}/>`;

  watchedList.appendChild(element);

  // prettier-ignore
  localStorage.setItem(`iw-${movie.imdbID}`, JSON.stringify({rating:[],note:""}));

  resultList.innerHTML = "";
  searchInput.value = "";
  watchedCount.innerHTML = watchedList.childElementCount;
};

// Add event listeners
searchBtn.addEventListener("click", handleSearch);
searchBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) searchBar.classList.add("active");
});

searchInput.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleSearch();
  }
});

document.addEventListener("click", event => {
  if (event.path.some(el => el.tagName == "MAIN")) {
    resultList.innerHTML = "";
    if (searchBar.classList.contains("active"))
      searchBar.classList.remove("active");
  }
});

getWatchedFromStorge();
