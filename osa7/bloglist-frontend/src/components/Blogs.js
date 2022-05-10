import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Blogs = () => {
  const sortedBlogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes)
  );
  return (
    <div>
      <BlogForm />
      <Table striped bordered hover>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} className="link-dark">
                  {blog.title} by {blog.author}
                </Link>
              </td>
              <td>
                <Link to={`/users/${blog.user.id}`} className="link-dark">
                  {blog.user.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
