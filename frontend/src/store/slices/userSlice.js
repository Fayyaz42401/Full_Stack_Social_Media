import { createSlice } from "@reduxjs/toolkit";
import {
  addFriend,
  allUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../actions/userAction";
import { toast } from "react-toastify";

const themeInitial = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "dark";

const initialState = {
  user: {},
  themeMode: themeInitial,
  isLoading: false,
  isAuthenticated: false,
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    themeHandler: (state, action) => {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.themeMode);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(addFriend.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addFriend.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(allUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allUser.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { themeHandler } = userSlice.actions;

export default userSlice.reducer;
