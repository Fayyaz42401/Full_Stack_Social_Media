import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST_API } from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const allPost = createAsyncThunk("post/allPost", async () => {
  try {
    const { data } = await axios.get(`${POST_API}/allpost`);
    return data.posts;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createPost = createAsyncThunk("post/createPost", async (form) => {
  try {
    const { data } = await axios.post(`${POST_API}/create`, form, config);
    toast.success(data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const addComment = createAsyncThunk(
  "post/addComment",
  async (id, comment) => {
    try {
      const { data } = await axios.put(
        `${POST_API}/addcomment/${id}`,
        comment,
        config
      );
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const manageLike = createAsyncThunk("post/manageLike", async (id) => {
  try {
    const { data } = await axios.put(
      `${POST_API}/managelike/${id}`,
      {},
      config
    );
    toast.success(data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const { data } = await axios.delete(`${POST_API}/delete/${id}`, {
      withCredentials: true,
    });
    toast.success(data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
