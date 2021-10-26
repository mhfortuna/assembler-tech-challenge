import { API } from "../constants/routes";
// import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeGifApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.GIF}`,
  });
}

export async function getGifs(limit = 5, page = 0, api = makeGifApi()) {
  // const token = await getCurrentUserToken();

  return api.get(`?page=${page}&limit=${limit}`);
}
