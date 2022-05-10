import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "../reducers/notificationReducer";
import blogsReducer from "../reducers/blogsReducer";
import currentUserReducer from "../reducers/currentUserReducer";
import usersReducer from "../reducers/usersReducer";

const reducer = {
  notification: notificationReducer,
  blogs: blogsReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
};

const store = configureStore({ reducer });

export default store;
