import axios from "axios";
const baseUrl = "/api/blogs";

let tokenHeader = null;

const setToken = (newToken) => {
  tokenHeader = `Bearer ${newToken}`;
};

const unsetToken = () => {
  tokenHeader = null;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newBlog = (title, author, url) => {
  const config = { headers: { Authorization: tokenHeader } };
  const request = axios.post(
    baseUrl,
    { title: title, author: author, url: url, likes: 0 },
    config
  );
  return request.then((response) => response.data);
};

const likeBlog = (blog) => {
  const config = { headers: { Authorization: tokenHeader } };
  const request = axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 },
    config
  );
  return request.then((response) => response.data);
};

const deleteBlog = (blog) => {
  const config = { headers: { Authorization: tokenHeader } };
  const request = axios.delete(`${baseUrl}/${blog.id}`, config);
  return request.then((response) => response.data);
};

const commentBlog = (blog, comment) => {
  const request = axios.post(`${baseUrl}/${blog.id}/comments`, {
    comment: comment,
  });
  return request.then((response) => response.data);
};

const blogService = {
  getAll,
  newBlog,
  setToken,
  unsetToken,
  likeBlog,
  deleteBlog,
  commentBlog,
};

export default blogService;
