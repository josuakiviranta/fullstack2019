import axios from 'axios'
const baseUrl = '/api/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('update id', id)
    console.log('newObject', newObject)
    const request = axios.put(baseUrl + id, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => axios.delete(baseUrl + id)

export default { getAll, create, update, deletePerson }