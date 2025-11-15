import axios from "axios";

const BASE_URL = "http://35.175.186.44:5001";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
