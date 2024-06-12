import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "frame",
  initialState: {
    fontSize: "font-medium",
    font: "font-sans-serif",
    theme: "theme-light",
    lineHeight: "line-medium",
  },
  reducers: {
    fontSizeChange: (state, action) => {
      state.fontSize = action.payload;
    },
    fontChange: (state, action) => {
      state.font = action.payload;
    },
    themeChange: (state, action) => {
      state.theme = action.payload;
    },
    lineHeightChange: (state, action) => {
      state.lineHeight = action.payload;
    },
  },
});

export const fontSizeSelector = (state) => state.frame.fontSize;
export const fontSelector = (state) => state.frame.font;
export const themeSelector = (state) => state.frame.theme;
export const lineHeightSelector = (state) => state.frame.lineHeight;
