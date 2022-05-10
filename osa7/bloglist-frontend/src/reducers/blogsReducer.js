import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      return state.map((blog) =>
        blog.id === id ? { ...blog, votes: blog.votes + 1 } : blog
      );
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const createNewBlog = (newTitle, newAuthor, newUrl) => {
  return async (dispatch, getState) => {
    try {
      const blog = await blogService.newBlog(newTitle, newAuthor, newUrl);
      dispatch(addBlog(blog));
      dispatch(
        setNotification(
          `A new blog "${blog.title}" by ${blog.author} has been added`
        )
      );
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    await blogService.likeBlog(blog);
    dispatch(
      setBlogs(
        getState().blogs.map((oldBlog) =>
          oldBlog.id === blog.id ? { ...blog, likes: blog.likes + 1 } : oldBlog
        )
      )
    );

    dispatch(setNotification(`Liked ${blog.title}`));
  };
};

export const fetchBlogs = () => {
  return async (dispatch, getState) => {
    dispatch(setBlogs(await blogService.getAll()));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      await blogService.deleteBlog(blog);
    } catch (error) {
      if (error.response.status !== 404) {
        dispatch(setNotification(error.response.data.error, true));
        return;
      }
    }

    dispatch(
      setBlogs(getState().blogs.filter((oldBlog) => oldBlog.id !== blog.id))
    );

    dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, false));
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.commentBlog(blog, comment);
    console.log(newBlog);
    dispatch(
      setBlogs(
        getState().blogs.map((oldBlog) =>
          oldBlog.id === blog.id ? newBlog : oldBlog
        )
      )
    );
  };
};

export const { setBlogs, addBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
