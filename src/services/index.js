import axios from "../axios.js";

export const getGenres = async () => {
  return axios.get("/api/get-genres-list");
};
