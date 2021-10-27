import { API } from "../constants/routes";

const axios = require("axios").default;

export function makeCategoriesApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.CATEGORIES}`,
  });
}

export async function getCategories(api = makeCategoriesApi()) {
  return api.get(``);
}
