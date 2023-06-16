import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  allPost,
  createPost,
  deletePost,
  manageLike,
} from "../actions/postAction";

const initialState = {
  posts: [],
  isLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All Post

    builder.addCase(allPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(allPost.rejected, (state, action) => {
      state.isLoading = false;
    });
    // Fetch Add Comment

    builder.addCase(addComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false;
    });
    // Create Post

    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
    });
    // Manage Like

    builder.addCase(manageLike.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(manageLike.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(manageLike.rejected, (state, action) => {
      state.isLoading = false;
    });
    // Delete Post

    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
