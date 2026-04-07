import axios, { type InternalAxiosRequestConfig } from "axios";
import config from "../config/config";

export interface Config extends InternalAxiosRequestConfig {
  retry: boolean;
}

const BASE_URL = config.BASE_URL;

const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";

export default baseApi;
