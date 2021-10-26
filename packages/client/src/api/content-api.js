import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeContentApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.CONTENT}`,
  });
}

export async function getContent(limit = 5, page = 0, api = makeContentApi()) {
  return api.get(`?page=${page}&limit=${limit}`);
}

export async function addContent(body = {}, api = makeContentApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, body, { headers: { Authorization: `Bearer ${token}` } });
}
