import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password, remember }) => {
    try {
      const { data } = await instance.post("/api/users/login", {
        username: username,
        password: password,
      });
      // Login Success, if remember me is checked store in local storage if not store in session storage
      if (data.username) {
        remember
          ? localStorage.setItem("auth", true)
          : sessionStorage.setItem("auth", true);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async ({ username, password, remember }) => {
    try {
      const { data } = await instance.post("/api/users/signup", {
        username: username,
        password: password,
      });
      // Register Success, if remember me is checked store in local storage if not store in session storage
      if (data.username) {
        remember
          ? localStorage.setItem("auth", true)
          : sessionStorage.setItem("auth", true);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "null",
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "loggedIn";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "loggedIn";
    });
  },
});

export default userSlice.reducer;
