const axios = require("axios").default;
const { config } = require("../../config");

const API_ROUTES = {
  MAIN: "https://api.giphy.com/v1/gifs",
  TRENDING: "/trending",
};

function makeGiphyApi() {
  return axios.create({
    baseURL: `${API_ROUTES.MAIN}`,
  });
}

function fetchPopularGifs(limit = 20, offset = 0, api = makeGiphyApi()) {
  return api.get(
    `${API_ROUTES.TRENDING}?api_key=${config.giphy.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );
}

module.exports = {
  fetchPopularGifs,
};
