import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    id: "",
    username: "",
    favoriteList: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.favoriteList = action.payload.favoriteList;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.id = "";
      state.username = "";
      state.favoriteList = [];
    },
  },
});

export const userSelector = (state) => state.user;

export const favoriteListSelector = (state) => state.user.favoriteList;
