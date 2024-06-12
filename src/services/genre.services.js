import axios from "../axios";

export const getGenres = async (server) => {
  return axios(server).get("/api/get-genres-list");
};
