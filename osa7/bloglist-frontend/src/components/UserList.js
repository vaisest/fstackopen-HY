import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>Users</h2>
      {users ? (
        <table>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {blogs.filter((blog) => blog.user.id === user.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default UserList;
