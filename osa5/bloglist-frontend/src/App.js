import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notificationMessage, setMessage] = useState('')
  const [notificationIsError, setNotificationIsError] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const existingToken = window.localStorage.getItem('blogUserToken')
    if (existingToken) {
      const user = JSON.parse(existingToken)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const flashMessage = (message, isError) => {
    setMessage(message)
    setNotificationIsError(isError)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('blogUserToken')
  }

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'Blogs'}</h2>
      {user === null ? null : (
        <p>
          {user.name} logged in{' '}
          {<button onClick={logoutHandler}>Log out</button>}
        </p>
      )}

      <Notification
        message={notificationMessage}
        notificationIsError={notificationIsError}
      />

      {user === null ? (
        <LoginForm setUser={setUser} flashMessage={flashMessage} />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          flashMessage={flashMessage}
          user={user}
        />
      )}
    </div>
  )
}

const Notification = ({ message, notificationIsError }) => {
  if (message === null || message === '') return null
  return (
    <div className={notificationIsError ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  notificationIsError: PropTypes.bool.isRequired,
}

export default App
