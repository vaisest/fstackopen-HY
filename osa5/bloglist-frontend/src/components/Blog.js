import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, flashMessage, user }) => {
  let [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeHandler = () => {
    blogService.likeBlog(blog).then(() => {
      setBlogs(
        blogs
          .map((oldBlog) => (oldBlog.id === blog.id ? blog : oldBlog))
          .sort((a, b) => b.likes - a.likes)
      )
      flashMessage(`Liked ${blog.title}`, false)
    })
  }

  const deleteHandler = async () => {
    if (
      !window.confirm(
        `Do you really want to delete "${blog.title}" by ${blog.author}`
      )
    ) {
      return
    }

    try {
      await blogService.deleteBlog(blog)
    } catch (error) {
      if (error.response.status !== 404) {
        flashMessage(error.response.data.error, true)
        return
      }
    }

    setBlogs(blogs.filter((oldBlog) => oldBlog.id !== blog.id))

    flashMessage(`Deleted ${blog.title} by ${blog.author}`, false)
  }

  const isOwnedByUser = user.id === blog.user.id

  return (
    <div className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility} className="viewButton">
        {visible ? 'Hide' : 'View'}
      </button>
      {visible ? (
        <div>
          <div>{blog.url}</div>
          <div className="likes-div">
            Likes {blog.likes}{' '}
            <button onClick={likeHandler} className="likeButton">
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {isOwnedByUser ? (
            <div>
              <button onClick={deleteHandler} className="deleteButton">
                Delete
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
