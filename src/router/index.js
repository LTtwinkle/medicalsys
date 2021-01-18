import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/account/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login/:userType',
    name: 'Login',
    component: () => import('../views/account/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/account/Register.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
