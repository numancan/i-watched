const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-input");
const resultList = document.querySelector(".result-list");
const watchedList = document.querySelector(".watched-list");
const watchedCount = document.querySelector(".watched-count");

const handleSearch = () => {
  let input = searchInput.value;

  fetch(`http://www.omdbapi.com/?s=${input}&apikey=e8381870`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      let movies = res.Search.slice(0, 5);
      movies.forEach(movie => {
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
    // prettier-ignore
    element.innerHTML += `<img src=${movie.Poster}/>
                          <p class="title">${movie.Title}</p><span class="year"> (${movie.Year})</span>
                          <p class="genre">${movie.Genre}</p>`;

    resultList.appendChild(element);
  }
};

const getWatchedFromStorge = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i).split("iw-")[1];
    if (key != undefined) {
      fetch(`http://www.omdbapi.com/?i=${key}&apikey=e8381870`)
        .then(res => {
          return res.json();
        })
        .then(res => {
          addToWatchedList(res);
        });
    }
  }
};

const addToWatchedList = movie => {
  let element = document.createElement("li");
  element.classList.add("watched");

  element.innerHTML += `<img src=${movie.Poster}/>
                        `;

  watchedList.appendChild(element);

  // prettier-ignore
  localStorage.setItem(`iw-${movie.imdbID}`, JSON.stringify({rating:[],note:""}));

  resultList.innerHTML = "";
  searchInput.value = "";
  watchedCount.innerHTML = watchedList.childElementCount;
};

/* internet
// Add event listeners
searchBtn.addEventListener("click", handleSearch);*/
searchBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) searchBar.classList.add("active");
});

searchInput.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    // handleSearch();
  }
});

document.addEventListener("click", event => {
  if (event.path.some(el => el.tagName == "MAIN")) {
    resultList.innerHTML = "";
    if (searchBar.classList.contains("active"))
      searchBar.classList.remove("active");
  }
});

// getWatchedFromStorge();

let movieList = [
  {
    Title: "The Good, The Luck, The Ugly",
    Year: 2018,
    Genre: "Horror, sci-fi",
    Poster: "'images/pos-1.jpg'"
  },
  {
    Title: "Naber ya bilader",
    Year: 2005,
    Genre: "Action",
    Poster: "'images/pos-2.jpg'"
  },
  {
    Title: "Breaking Bad",
    Year: 2009,
    Genre: "Crime, horror",
    Poster: "'images/pos-3.jpg'"
  },
  {
    Title: "Hey Arnould!",
    Year: 2019,
    Genre: "Comedy, animation",
    Poster: "'images/pos-4.jpg'"
  },
  {
    Title: "Star Wars Nerden Geldik Buraya",
    Year: 1453,
    Genre: "Comedy, işin kılıçları",
    Poster: "'images/pos-5.jpg'"
  }
];

searchBtn.addEventListener("click", srcc);

function srcc() {
  movieList.forEach(movie => {
    let element = document.createElement("li");
    element.classList.add("result");
    element.addEventListener("click", () => addToWatchedList(movie));
    // prettier-ignore
    element.innerHTML += `<img src=${movie.Poster}/>
                          <p class="title">${movie.Title}</p>
                          <span class="year"> (${movie.Year})</span>
                          <p class="genre">${movie.Genre}</p>`;

    resultList.appendChild(element);
  });
}

for (let i = 0; i < 5; i++) {
  const movie = movieList[i];
  let element = document.createElement("li");
  element.classList.add("result");
  addToWatchedList(movie);
}
