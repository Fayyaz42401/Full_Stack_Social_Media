import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API } from "../../utils/api";
import { toast } from "react-toastify";

const config = {
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
};
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData) => {
    try {
      const { data } = await axios.post(
        `${USER_API}/register`,
        formData,
        config
      );
      toast.success(data.message);
      return data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);
export const loginUser = createAsyncThunk("user/login", async (formData) => {
  try {
    const { data } = await axios.post(`${USER_API}/login`, formData, config);
    toast.success(data.message);
    return data.user;
  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error);
  }
  s;
});
export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const { data } = await axios.get(`${USER_API}/me`, {
      withCredentials: true,
    });
    toast.success(data.message);
    return data.user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.get(`${USER_API}/logout`, config);
    toast.success(data.message);
    return data.user;
  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error);
  }
});
export const addFriend = createAsyncThunk("user/addFriend", async (id) => {
  try {
    const { data } = await axios.patch(`${USER_API}/add/${id}`, {}, config);
    toast.success(data.message);
    return data.user;
  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error);
  }
});
export const allUser = createAsyncThunk("user/allUser", async () => {
  try {
    const { data } = await axios.get(`${USER_API}/alluser`, {
      withCredentials: true,
    });
    return data.users;
  } catch (error) {
    return rejectWithValue(error);
  }
});
