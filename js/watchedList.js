import { Storage } from './storage.js';

const watchedList = document.querySelector('.watched-list');
const watchedCount = document.querySelector('.watched-count');
const storge = new Storage();

const createElement = watched => {
  let element = document.createElement('li');
  element.classList.add('watched');

  // prettier-ignore
  element.innerHTML += `<img src="${watched.poster}" alt="poster" />
                        <div class="holder">
                          <h3>${watched.title} <span>(${watched.year})</span></h3>
                          <div class="note">
                            <h4>Note</h4>
														<textarea name="note" spellcheck="false" placeholder="..">${watched.note}</textarea>
                        </div>
                      </div>`;

  return element;
};

const updateWatchedCount = () => {
  watchedCount.innerHTML = watchedList.childElementCount;
};

const appendToWatchedList = watched => {
  storge.get(watched.id) || storge.set(watched.id, watched);
  let element = createElement(watched);
  watchedList.prepend(element);

  element.lastElementChild.addEventListener('input', function() {
    watched.note = this.getElementsByTagName('textarea').note.value;
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
