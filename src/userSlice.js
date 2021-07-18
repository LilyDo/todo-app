import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isWrong: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // NOTE: fake backend: pass if username is "todo" and password is "todo123"
      const { payload } = action;
      if (payload.username === "todo" && payload.password === "todo123") {
        state.username = action.payload.username;
        state.isWrong = false;
      } else {
        state.isWrong = true;
      }
    },
    logout: (state, action) => {
      state.username = "";
      state.isWrong = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
