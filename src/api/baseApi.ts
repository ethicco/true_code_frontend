import axios, { AxiosError } from "axios";
import config from "../config/config";

const BASE_URL = config.BASE_URL;

const baseApi = axios.create({
  baseURL: BASE_URL,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {},
);

export default baseApi;
