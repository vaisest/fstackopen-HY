import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      return state.map((dote) =>
        dote.id === id ? { ...dote, votes: dote.votes + 1 } : dote
      );
    },
    addAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const dotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(dotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newDote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(anecdote.id, newDote);
    dispatch(increaseVote(anecdote.id));
  };
};

export const { increaseVote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
