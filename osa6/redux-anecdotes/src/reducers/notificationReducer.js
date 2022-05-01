import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", timer: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessageInNotification(state, action) {
      return { ...state, message: action.payload };
    },
    setTimerInNotification(state, action) {
      return { ...state, timer: action.payload };
    },
    resetNotification(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (message, seconds) => {
  return async (dispatch, getState) => {
    dispatch(setMessageInNotification(message));

    clearTimeout(getState().timer);

    const newTimer = setTimeout(
      () => dispatch(resetNotification()),
      seconds * 1000
    );
    dispatch(setTimerInNotification(newTimer));
  };
};

export const {
  setMessageInNotification,
  resetNotification,
  setTimerInNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
