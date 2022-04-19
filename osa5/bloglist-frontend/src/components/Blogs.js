import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, setBlogs, flashMessage, user }) => {
  const createNewBlog = (newTitle, newAuthor, newUrl) => {
    blogService
      .newBlog(newTitle, newAuthor, newUrl)
      .then((blog) => {
        setBlogs([...blogs, blog].sort((a, b) => b.likes - a.likes))

        flashMessage(
          `A new blog "${blog.title}" by ${blog.author} has been added`,
          false
        )
      })
      .catch((error) => flashMessage(error.response.data.error, true))
  }

  return (
    <div>
      <BlogForm createNewBlog={createNewBlog} />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          flashMessage={flashMessage}
          user={user}
        />
      ))}
    </div>
  )
}

export default Blogs
