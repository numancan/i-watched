class Storage {
  set = (id, watched) => {
    localStorage.setItem(`iw-${id}`, JSON.stringify(watched));
  };

  get = id => {
    return JSON.parse(localStorage.getItem(`iw-${id}`));
  };

  // TODO: store all watched movie under one item
  getAll = () => {
    let watchedList = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i).split("iw-")[1];

      if (key != undefined) {
        let watched = this.get(key);
        watchedList.push(watched);
      }
    }
    return watchedList;
  };
}

export { Storage };
