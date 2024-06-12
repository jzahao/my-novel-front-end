import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "server",
  initialState: {
    url: process.env.REACT_APP_URL_BACKEND_1,
  },
  reducers: {
    serverChange: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const serverSelector = (state) => state.server.url;
