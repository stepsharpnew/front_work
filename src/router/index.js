import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/pages/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router