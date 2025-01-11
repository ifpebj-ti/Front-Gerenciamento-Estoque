import axios from "axios";

export const api = axios.create({
  baseURL: "http://137.131.180.24:8080/",
  headers: {
    "Content-Type": "application/json",

  },
  timeout: 10000,
});
