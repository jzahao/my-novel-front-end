import axios from "../axios";

export const login = async (server, username, password) => {
  return axios(server).post("/api/login", { username, password });
};

export const register = async (server, username, password) => {
  return axios(server).post("/api/register", { username, password });
};

export const getFavoriteList = async (server, user_id) => {
  return axios(server).get(`/api/get-favorite-list?user_id=${user_id}`);
};
