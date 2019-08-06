import { getDataFromAPI } from "./api.js";
import { appendToWatchedList } from "./watchedList.js";

const searchInput = document.querySelector(".src-bar__input");
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
  let input = searchInput.value || "breaking";

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

export { handleSearch };
