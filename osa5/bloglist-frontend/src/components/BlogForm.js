import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    createNewBlog(newTitle, newAuthor, newUrl)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    setVisible(false)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      {visible && (
        <div>
          <form onSubmit={handleNewBlog} id="new-blog-form">
            <div>
              Title{' '}
              <input
                type="text"
                value={newTitle}
                name="Title"
                onChange={(event) => setNewTitle(event.target.value)}
                id="new-blog-title-input"
              />
            </div>
            <div>
              Author{' '}
              <input
                type="text"
                value={newAuthor}
                name="Author"
                onChange={(event) => setNewAuthor(event.target.value)}
                id="new-blog-author-input"
              />
            </div>
            <div>
              Url{' '}
              <input
                type="text"
                value={newUrl}
                name="Url"
                onChange={(event) => setNewUrl(event.target.value)}
                id="new-blog-url-input"
              />
            </div>
            <button type="submit" className="blogFormCreateButton">
              Create
            </button>
          </form>
        </div>
      )}
      <button onClick={toggleVisibility} className="blogFormVisibilityButton">
        {visible ? 'Cancel' : 'Add a new blog'}
      </button>
    </div>
  )
}

export default BlogForm
