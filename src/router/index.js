import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import AboutPage from '../components/pages/AboutPage.vue'
import ServicesPage from '../components/pages/ServicesPage.vue'
import ContactPage from '../components/pages/ContactPage.vue'
import LoginPage from '../components/pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesPage
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Глобальный перехватчик авторизации
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const accessToken = localStorage.getItem('access_token');

  if (authRequired && !accessToken) {
    return next('/login');
  }
  next();
});

export default router