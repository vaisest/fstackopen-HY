import axios from 'axios'
const baseUrl = '/api/login'

const getAll = ({ username, password }) => {
  const request = axios.post(baseUrl, { username, password })
  return request.then((response) => response.data)
}

const loginService = { getAll }

export default loginService
