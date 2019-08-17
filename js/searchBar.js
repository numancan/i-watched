import { getDataFromAPI } from './api.js';
import { appendToWatchedList } from './watchedList.js';

const searchBar = document.querySelector('.src-bar');
const searchInput = document.querySelector('.src-bar__input');
const searchBtn = document.querySelector('.src-bar__btn');
const searchIcon = searchBtn.querySelector('i');
const resultList = document.querySelector('.result-list');

// Clear search bar's input and result list
const clear = () => {
  searchInput.value = '';
  resultList.innerHTML = '';
};

const changeLoadingState = () => {
  searchIcon.className =
    searchIcon.className === 'fas fa-spinner spin'
      ? 'fas fa-search'
      : 'fas fa-spinner spin';
};

const appendMovieToResutList = movie => {
  const element = createElement();
  resultList.appendChild(element);

  function createElement() {
    let element = document.createElement('li');
    element.classList.add('result');
    element.addEventListener('click', () => {
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
  const input = searchInput.value;
  if (!input) return;
  resultList.innerHTML = '';
  changeLoadingState();
  getDataFromAPI(`s=${input}`)
    .then(data => {
      const searchResult = data.Search || [];
      searchResult.forEach(result => {
        getDataFromAPI(`i=${result.imdbID}`).then(result => {
          const {
            imdbID: id,
            Genre: genre,
            Poster: poster,
            Title: title,
            Year: year
          } = result;
          const movie = { id, genre, poster, title, year, note: '' };
          movie.poster =
            movie.poster || movie.poster === 'N/A' || '../images/no-image.png';
          appendMovieToResutList(movie);
        });
      });
    })
    .then(() => {
      changeLoadingState();
    });
};

const initialize = () => {
  searchBtn.addEventListener('click', () => {
    const tabletWidth = 768;
    window.innerWidth <= tabletWidth && searchBar.classList.add('active');
    handleSearch();
  });

  // If press enter
  searchInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  });

  document.addEventListener('click', event => {
    if (event.path.some(el => el.tagName == 'MAIN')) {
      clear();
      searchBar.classList.contains('active') &&
        searchBar.classList.remove('active');
    }
  });
};

export default { initialize };
