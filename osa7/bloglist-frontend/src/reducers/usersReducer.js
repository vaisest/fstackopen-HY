import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      return state.concat(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    },
    resetUsers(state, action) {
      return initialState;
    },
  },
});

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { addUser, setUsers, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
