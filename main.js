const searchBtn = document.querySelector(".search-btn");
const resultList = document.querySelector(".result-list");
const watchedList = document.querySelector(".watched-list");
const watchedCount = document.querySelector(".watched-count");
const searchInput = document.querySelector(".search-input");

const handleSearch = () => {
  let input = searchInput.value;

  fetch(`http://www.omdbapi.com/?s=${input}&apikey=e8381870`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      res.Search.forEach(movie => {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e8381870`)
          .then(res => {
            return res.json();
          })
          .then(res => {
            addMovieToResultList(res);
          });
      });
    });

  function addMovieToResultList(movie) {
    let element = document.createElement("li");
    element.classList.add("result");
    element.addEventListener("click", () => addToWatchedList(movie));

    element.innerHTML += `<img  alt="" />
                            <h3>${movie.Title} (${movie.Year})</h3>
                            <div class="imdb">IMDb ${movie.imdbRating}</div>
                            <div class="genre">${movie.Genre}</div>`;

    resultList.appendChild(element);
  }
};

const addToWatchedList = movieInfo => {
  let element = document.createElement("li");
  element.classList.add("watched");

  element.innerHTML += `<img src=${movieInfo.Poster}/>
                        <h3>${movieInfo.Title}</h3>`;

  watchedList.appendChild(element);

  // Clear result list
  resultList.innerHTML = "";
  // Clear input value
  searchInput.value = "";
  // Update watched count
  watchedCount.innerHTML = watchedList.childElementCount;
};

searchBtn.addEventListener("click", handleSearch);
