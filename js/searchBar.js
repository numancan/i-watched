import { getDataFromAPI } from "./api.js";
import { appendToWatchedList } from "./watchedList.js";

const searchBar = document.querySelector(".src-bar");
const searchInput = document.querySelector(".src-bar__input");
const searchBtn = document.querySelector(".src-bar__btn");
const resultList = document.querySelector(".result-list");

// Clear search bar's input and result list
const clear = () => {
  searchInput.value = "";
  resultList.innerHTML = "";
};

const appendMovieToResutList = movie => {
  let element = createElement();
  resultList.appendChild(element);

  function createElement() {
    let element = document.createElement("li");
    element.classList.add("result");
    element.addEventListener("click", () => {
      appendToWatchedList(movie);
      clear();
    });
    element.innerHTML += `<img src=${movie.poster}>
                        <div class="result__holder">
                        <p class="title">${movie.title}</p>
                        <span class="year"> (${movie.year})</span>
                        <p class="genre">${movie.genre}</p></div>`;
    return element;
  }
};

const handleSearch = () => {
  let input = searchInput.value;
  if (!input) return;

  getDataFromAPI(`s=${input}`).then(data => {
    let searchResult = data.Search || [];
    searchResult.forEach(result => {
      getDataFromAPI(`i=${result.imdbID}`).then(result => {
        // TODO: clear this shit
        let {
          imdbID: id,
          Genre: genre,
          Poster: poster,
          Title: title,
          Year: year
        } = result;
        let movie = { id, genre, poster, title, year, note: "" };
        appendMovieToResutList(movie);
      });
    });
  });
};

const initialize = () => {
  searchBtn.addEventListener("click", () => {
    if (window.innerWidth <= 768) searchBar.classList.add("active");
    handleSearch();
  });

  searchInput.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  });

  document.addEventListener("click", event => {
    if (event.path.some(el => el.tagName == "MAIN")) {
      clear();
      if (searchBar.classList.contains("active"))
        searchBar.classList.remove("active");
    }
  });
};

export default { initialize };
