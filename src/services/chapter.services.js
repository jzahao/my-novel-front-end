import axios from "../axios";

export const getChaptersList = async (server, novelId) => {
  return axios(server).get(`/api/get-chapters-list?novelId=${novelId}`);
};

export const getChapter = async (server, novelId, chapterNumber) => {
  return axios(server).get(
    `/api/get-chapter?novelId=${novelId}&chapterNumber=${chapterNumber}`
  );
};
