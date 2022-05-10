import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = null; //{ token: null, username: null, name: null, id: null };

const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    resetUser(state, action) {
      return initialState;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch, getState) => {
    try {
      const user = await loginService.login(username, password);
      dispatch(setUser(user));
      window.localStorage.setItem("blogUserObject", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true));
    }
  };
};

export const setLogin = (user) => {
  return (dispatch, getState) => {
    dispatch(setUser(user));
    blogService.setToken(user?.token);
  };
};

export const loginFromStorageMaybe = () => {
  return (dispatch, getState) => {
    // should be null if it doesn't exist
    const user = JSON.parse(window.localStorage.getItem("blogUserObject"));
    dispatch(setLogin(user));
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(resetUser());
    blogService.unsetToken();
    window.localStorage.removeItem("blogUserObject");
  };
};

export const { setUser, resetUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
