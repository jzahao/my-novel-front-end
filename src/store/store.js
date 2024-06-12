import { configureStore } from "@reduxjs/toolkit";

import frameSlice from "./frame.slice.js";
import serverSlice from "./server.slice.js";
import userSlice from "./user.slice.js";

const store = configureStore({
  reducer: {
    server: serverSlice.reducer,
    frame: frameSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
