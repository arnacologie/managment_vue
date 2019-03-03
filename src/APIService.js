import axios from 'axios'
const API_URL = 'http://localhost:4000/api/v1'

export class APIService {
  getTodos () {
    const url = `${API_URL}/todos`
    return axios.get(url).then(response => response.data)
  }
  getTodo (id) {
    const url = `${API_URL}/todos/${id}`
    return axios.get(url).then(response => response.data)
  }

  deleteTodo (todo) {
    const url = `${API_URL}/delete/${todo._id}`
    return axios.get(url)
  }

  createTodo (todo) {
    const url = `${API_URL}/create`
    return axios.post(url, todo)
  }

  updateTodo (todo) {
    const url = `${API_URL}/todos/${todo._id}`
    return axios.put(url, todo)
  }
}
