import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { deleteBlog, likeBlog, commentBlog } from "../reducers/blogsReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.currentUser);

  const [commentValue, setComment] = useState("");

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const likeHandler = () => dispatch(likeBlog(blog));

  const deleteHandler = async () => {
    const confirmation = `Do you really want to delete "${blog.title}" by ${blog.author}`;
    if (!window.confirm(confirmation)) {
      return;
    }

    dispatch(deleteBlog(blog));
  };

  const commentHandler = (event) => {
    event.preventDefault();
    setComment("");
    dispatch(commentBlog(blog, commentValue));
  };

  const isOwnedByUser = blog && user ? blog.user.id === user.id : null;

  return blog ? (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="likes-div">
        Likes {blog.likes}{" "}
        <button onClick={likeHandler} className="likeButton">
          Like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
      {isOwnedByUser ? (
        <div>
          <button onClick={deleteHandler} className="deleteButton">
            Delete
          </button>
        </div>
      ) : null}
      <h3>Comments</h3>
      <form onSubmit={commentHandler}>
        <input
          type="text"
          value={commentValue}
          name="Comment"
          id="commentInput"
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit" id="comment-button">
          Comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default BlogPage;
