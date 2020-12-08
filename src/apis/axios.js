
import intanceAxios from "axios";
import constants from "../constants";
const axios = intanceAxios.create({
  baseURL: constants.urlsApi.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export { axios };
