import { Storage } from "./storage.js";

const overlay = document.querySelector(".overlay");
const watchedList = document.querySelector(".watched-list");
const watchedCount = document.querySelector(".watched-count");
const storge = new Storage();

const createElement = watched => {
  let element = document.createElement("li");
  element.classList.add("watched");

  // prettier-ignore
  element.innerHTML += `<img src="${watched.poster}" alt="poster" />
                        <div class="holder">
                          <h3>${watched.title} <span>(${watched.year})</span></h3>
                          <div class="note">
                            <h4>Note</h4>
														<textarea name="note" spellcheck="false" placeholder="..">${watched.note}</textarea>
                        </div>
                      </div>`;

  element.addEventListener("mouseenter", event => {
    overlay.classList.add("active");
  });

  element.addEventListener("mouseleave", event => {
    overlay.classList.remove("active");
  });

  return element;
};

const updateWatchedCount = () => {
  watchedCount.innerHTML = watchedList.childElementCount;
};

const appendToWatchedList = watched => {
  if (storge.get(watched.id) == null) storge.set(watched.id, watched);
  let element = createElement(watched);
  watchedList.appendChild(element);

  element.lastElementChild.addEventListener("change", function() {
    watched.note = this.getElementsByTagName("textarea").note.value;
    storge.set(watched.id, watched);
  });

  updateWatchedCount();
};

const initialize = () => {
  const watchedInStorage = storge.getAll();
  watchedInStorage.forEach(watched => {
    appendToWatchedList(watched);
  });
};

export default { initialize };
export { appendToWatchedList };
