import Vue from 'vue'
import Router from 'vue-router'
//  import Home from './views/Home.vue'
import CreateTodo from './components/CreateTodo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/todos/create/:id',
      name: 'CreateTodo',
      component: CreateTodo
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
