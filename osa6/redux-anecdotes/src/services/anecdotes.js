import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const doteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, doteObject);
  return response.data;
};

const update = async (id, newDote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newDote);
  return response.data;
};

const anecdoteService = { getAll, createNew, update };
export default anecdoteService;
