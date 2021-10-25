import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeAuthApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.AUTH}`,
  });
}

export function signInUserData(token, api = makeAuthApi()) {
  return api.get(API.LOGIN, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createClient(data = {}, api = makeAuthApi()) {
  const token = await getCurrentUserToken();

  return api.post(API.REGISTER, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
