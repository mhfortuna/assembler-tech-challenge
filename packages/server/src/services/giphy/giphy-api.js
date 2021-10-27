const axios = require("axios").default;
const { config } = require("../../config");

const API_ROUTES = {
  MAIN: "https://api.giphy.com/v1",
  GIFS: "/gifs",
  TRENDING: "/trending",
  CHANNELS: "/channels",
  SEARCH: "/search",
};

function makeGiphyApi() {
  return axios.create({
    baseURL: `${API_ROUTES.MAIN}`,
  });
}

function fetchPopularGifs(limit = 20, offset = 0, api = makeGiphyApi()) {
  return api.get(
    `${API_ROUTES.GIFS}${API_ROUTES.TRENDING}?api_key=${config.giphy.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );
}

function fetchGifsByCategory(
  categoryName,
  limit = 20,
  offset = 0,
  api = makeGiphyApi(),
) {
  const categoryCode = {
    sports: 679,
    entertainment: 680,
    reactions: 681,
    gaming: 9759918,
    meme: 4953454,
    emotions: 681,
    action: 6206631,
    food: 7719586,
    animals: 8763,
  };
  return api.get(
    `${API_ROUTES.CHANNELS}/${categoryCode[categoryName]}${API_ROUTES.GIFS}?api_key=${config.giphy.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );
}

function searchGifs(query, limit = 20, offset = 0, api = makeGiphyApi()) {
  return api.get(
    `${API_ROUTES.GIFS}${API_ROUTES.SEARCH}?api_key=${config.giphy.apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );
}

module.exports = {
  fetchPopularGifs,
  fetchGifsByCategory,
  searchGifs,
};
