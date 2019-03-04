import axios from 'axios'
const API_URL = 'http://localhost:4000/api/v1'

export class APIService {
  // TODOS
  getTodos () {
    const url = `${API_URL}/todos`
    return axios.get(url).then(response => response.data)
  }
  getTodo (id) {
    const url = `${API_URL}/todo/${id}`
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
    const url = `${API_URL}/todo/${todo._id}`
    return axios.put(url, todo)
  }

  // CLIENTS

  getClients () {
    const url = `${API_URL}/clients`
    return axios.get(url).then(response => response.data)
  }
  getClient (id) {
    const url = `${API_URL}/client/${id}`
    return axios.get(url).then(response => response.data)
  }
  deleteClient (client) {
    const url = `${API_URL}/client/delete/${client._id}`
    return axios.get(url)
  }
  createClient (client) {
    const url = `${API_URL}/client/create`
    return axios.post(url, client)
  }
  updateClient (client) {
    const url = `${API_URL}/client/${client._id}`
    return axios.put(url, client)
  }

  // EMPLOYEES

  getEmployees () {
    const url = `${API_URL}/employees`
    return axios.get(url).then(response => response.data)
  }
  getEmployee (id) {
    const url = `${API_URL}/employee/${id}`
    return axios.get(url).then(response => response.data)
  }
  deleteEmployee (employee) {
    const url = `${API_URL}/employee/delete/${employee._id}`
    return axios.get(url)
  }
  createEmployee (employee) {
    const url = `${API_URL}/employee/create`
    return axios.post(url, employee)
  }
  updateEmployee (employee) {
    const url = `${API_URL}/employee/${employee._id}`
    return axios.put(url, employee)
  }

  // PROJECTS

  getProjects () {
    const url = `${API_URL}/projects`
    return axios.get(url).then(response => response.data)
  }
  getProject (id) {
    const url = `${API_URL}/project/${id}`
    return axios.get(url).then(response => response.data)
  }
  deleteProject (project) {
    const url = `${API_URL}/project/delete/${project._id}`
    return axios.get(url)
  }
  createProject (project) {
    const url = `${API_URL}/project/create`
    return axios.post(url, project)
  }
  updateProject (project) {
    const url = `${API_URL}/project/${project._id}`
    return axios.put(url, project)
  }

  // COUNTS

  getClientNr () {
    const url = `${API_URL}/client_count`
    return axios.get(url)
  }
  getEmployeeNr () {
    const url = `${API_URL}/employee_count`
    return axios.get(url)
  }
  getProjectNr () {
    const url = `${API_URL}/project_count`
    return axios.get(url)
  }
}
