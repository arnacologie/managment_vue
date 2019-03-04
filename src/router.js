/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import CreateTodo from './components/CreateTodo.vue'
import Home from './views/Home.vue'
import Employee_Home from './views/Employee_Home.vue'
import Project_Home from './views/Project_Home.vue'
import Client_Home from './views/Client_Home.vue'
import CU_Client from './components/CU_Client.vue'
import CU_Employee from './components/CU_Employee.vue'
import CU_Project from './components/CU_Project.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todos/create/:id',
      name: 'CU_CLient',
      component: CreateTodo
    },
    {
      path: '/client/create/:id',
      name: 'CU_Client',
      component: CU_Client
    },
    {
      path: '/employee/create/:id',
      name: 'CU_Empoyee',
      component: CU_Employee
    },
    {
      path: '/project/create/:id',
      name: 'CU_Project',
      component: CU_Project
    },
    {
      path: '/clients',
      name: 'client_home',
      component: Client_Home
    },
    {
      path: '/employees',
      name: 'employee_home',
      component: Employee_Home
    },
    {
      path: '/projects',
      name: 'project_home',
      component: Project_Home
    },
    {
      path: '/todos',
      name: 'ListTodo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/ListTodo.vue')
    }
  ]
})
