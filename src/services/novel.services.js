import axios from "../axios";

export const getAllNovels = async (server) => {
  return axios(server).get("/api/get-all-novels");
};

export const getNovelsListByLatestUpdate = async (server) => {
  return axios(server).get("/api/get-novels-list-by-latest-update");
};

export const getNovelsListByView = async (server) => {
  return axios(server).get("/api/get-novels-list-by-view");
};

export const getNovelsListByGenre = async (server, genre) => {
  return axios(server).get(`/api/get-novels-list-by-genre?genre=${genre}`);
};

export const getNovelsListByKeyword = async (server, keyword) => {
  return axios(server).get(
    `/api/get-novels-list-by-keyword?keyword=${keyword}`
  );
};

export const getNovel = async (server, id) => {
  return axios(server).get(`/api/get-novel?id=${id}`);
};

export const getNovelGenres = async (server, id) => {
  return axios(server).get(`/api/get-novel-genres?id=${id}`);
};

export const getNovelSources = async (server, id) => {
  return axios(server).get(`/api/get-novel-sources?id=${id}`);
};

export const countViewNovel = async (server, id, currentView) => {
  return axios(server).put("/api/count-view-novel", { id, currentView });
};

export const getMinAndMaxChapter = async (server, id) => {
  return axios(server).get(`/api/get-min-and-max-chapter?id=${id}`);
};
