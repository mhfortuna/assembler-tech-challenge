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

export async function getContentByCategoryId(
  categoryName,
  limit = 5,
  page = 0,
  api = makeContentApi(),
) {
  return api.get(
    `${API.CATEGORIES}/${categoryName}?page=${page}&limit=${limit}`,
  );
}

export async function getContentById(contentId, api = makeContentApi()) {
  return api.get(`/${contentId}`);
}

export async function addContent(body = {}, api = makeContentApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, body, { headers: { Authorization: `Bearer ${token}` } });
}
