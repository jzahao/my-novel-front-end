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

export const addFavoriteNovel = async (server, user_id, novel_id) => {
  return axios(server).post("/api/add-favorite-novel", { user_id, novel_id });
};

export const deleteFavoriteNovelSV = async (server, user_id, novel_id) => {
  return axios(server).delete("/api/delete-favorite-novel", {
    data: { user_id, novel_id },
  });
};
