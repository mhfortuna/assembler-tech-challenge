import { API } from "../constants/routes";

const axios = require("axios").default;

export function makeSearchApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.SEARCH}`,
  });
}

export async function searchContent(
  query,
  limit = 5,
  page = 0,
  api = makeSearchApi(),
) {
  return api.get(`${API.CONTENT}?q=${query}&page=${page}&limit=${limit}`);
}
