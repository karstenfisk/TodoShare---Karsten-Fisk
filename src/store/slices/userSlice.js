import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://notes-2254.onrender.com/",
  withCredentials: true,
});

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  try {
    const { data } = await instance.get("/api/users/me");
    data.notes = data.notes.sort((a, b) => {
      if (a.userNote.userType > b.userNote.userType) return -1;
      if (a.userNote.userType < b.userNote.userType) return 1;
      return 0;
    });

    return data;
  } catch (e) {
    throw e;
  }
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
export const addNote = createAsyncThunk("user/addNote", async (info) => {
  try {
    const res = await instance.post("/api/notes", info);
    //Check if note was created then re-fetch user with all notes including the new one.
    if (res.data.title) {
      const { data } = await instance.get("/api/users/me");
      data.notes = data.notes.sort((a, b) => {
        if (a.userNote.userType > b.userNote.userType) return -1;
        if (a.userNote.userType < b.userNote.userType) return 1;
        return 0;
      });
      return data;
    } else {
      const { data } = await instance.get("/api/users/me");
      data.notes = data.notes.sort((a, b) => {
        if (a.userNote.userType > b.userNote.userType) return -1;
        if (a.userNote.userType < b.userNote.userType) return 1;
        return 0;
      });
      return data;
    }
  } catch (e) {
    throw e;
  }
});
export const signOut = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await instance.get("/api/users/logout");
    return data;
  } catch (e) {
    throw e;
  }
});
export const acceptFriend = createAsyncThunk(
  "user/acceptFriend",
  async (id) => {
    try {
      const { data } = await instance.put("/api/users/friends/accept", id);
      return data;
    } catch (e) {
      throw e;
    }
  }
);
export const rejectFriend = createAsyncThunk(
  "user/rejectFriend",
  async ({ id }) => {
    try {
      const { data } = await instance.delete(
        `/api/users/friends/rejected/${id}`
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
);
export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (username) => {
    try {
      const { data } = await instance.post("/api/users/friends/add", username);
      return data;
    } catch (e) {
      throw e;
    }
  }
);
export const removeGuest = createAsyncThunk(
  "user/removeGuest",
  async (info) => {
    try {
      await instance.post("/api/notes/remove", info);
      const { data } = await instance.get("/api/users/me");
      data.notes = data.notes.sort((a, b) => {
        if (a.userNote.userType > b.userNote.userType) return -1;
        if (a.userNote.userType < b.userNote.userType) return 1;
        return 0;
      });
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
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.status = "null";
      state.user = {};
    });
    builder.addCase(acceptFriend.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(rejectFriend.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(removeGuest.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        action.error.message === "Request failed with status code 404"
          ? (state.status = "invalid")
          : (state.status = "rejected");
        state.user = {};
      });
  },
});

export default userSlice.reducer;
