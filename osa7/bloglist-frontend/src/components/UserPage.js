import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const UserPage = () => {
  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");

  const user = match ? users.find((user) => user.id === match.params.id) : null;
  const userBlogs = user?.blogs;

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default UserPage;
