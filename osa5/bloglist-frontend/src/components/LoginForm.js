import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, flashMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    loginService
      .getAll({ username, password })
      .then((user) => {
        setUser(user)
        window.localStorage.setItem('blogUserToken', JSON.stringify(user))
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      })
      .catch((error) => flashMessage(error.response.data.error, true))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            id="usernameInput"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            id="passwordInput"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
