import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  console.log('inside create')
  const config = {
    headers: { Authorization: token },
  }
  console.log('Config headers', config.headers)
  console.log('Auth token', token)

  const response = await axios.post(baseUrl, newObject, config)
  console.log('Before return')
  return response.data
}

export default { getAll, create, setToken }