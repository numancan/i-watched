const getDataFromAPI = key => {
  let url = `https://www.omdbapi.com/?${key}&r=json&apikey=e8381870`;
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};

export { getDataFromAPI };
