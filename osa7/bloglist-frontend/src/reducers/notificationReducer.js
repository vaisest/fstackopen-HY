import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", isError: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessageInNotification(state, action) {
      return { ...state, message: action.payload };
    },
    setIsError(state, action) {
      return { ...state, isError: action.payload };
    },
    resetNotification(state, action) {
      return initialState;
    },
  },
});

let timer;

export const setNotification = (message, isError = false) => {
  return async (dispatch, getState) => {
    dispatch(setMessageInNotification(message));
    dispatch(setIsError(isError));

    clearTimeout(timer);
    timer = setTimeout(() => dispatch(resetNotification()), 5 * 1000);
  };
};

export const { setMessageInNotification, resetNotification, setIsError } =
  notificationSlice.actions;
export default notificationSlice.reducer;
