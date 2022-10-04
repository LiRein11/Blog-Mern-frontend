import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPostsDate = createAsyncThunk('posts/fetchPostsDate', async () => {
  const { data } = await axios.get('/posts/date');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  const { data } = await axios.get('/posts/comments/allcomments');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', (id) =>
  axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: {
    // Получение статей
    [fetchPostsDate.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPostsDate.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsDate.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    // Получение комментариев
    [fetchComments.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
