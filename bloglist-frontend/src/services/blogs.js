import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  try{
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    console.log(error.response.data);
  }
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  } catch(error) {
    console.log(error.response)
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, create, update, deleteBlog }