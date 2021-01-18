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
  {
    path: '/doctor',
    name: 'Doctor',
    component: () => import('../views/doctor/Doctor.vue'),
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/manager/Manager.vue'),
  },
  {
    path: '/patient',
    name: 'Patient',
    component: () => import('../views/patient/Patient.vue'),
  },
  {
    path: '/treator',
    name: 'Treator',
    component: () => import('../views/treator/Treator.vue'),
  },
  {
    path: '/pharmacy',
    name: 'Pharmacy',
    component: () => import('../views/pharmacy/Pharmacy.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
