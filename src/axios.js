import axios from "axios";
// import _ from "lodash";

const createAxios = (serverURL) => {
  // console.log(serverURL);
  const instance = axios.create({
    baseURL: serverURL,
    // withCredentials: true
  });

  instance.interceptors.response.use((response) => {
    // const { data } = response;
    return response.data;
  });
  return instance;
};

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_URL_BACKEND,
//   // withCredentials: true
// });

// instance.interceptors.response.use((response) => {
//   // const { data } = response;
//   return response.data;
// });

export default createAxios;
