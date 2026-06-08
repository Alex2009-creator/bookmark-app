import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Statistic from './components/Statistic.vue'
import CardCurrent from './components/TimerRelax.vue'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue'
import TimerRelax from './components/TimerRelax.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true }, // 1. Защищаем главную страницу
    },
    {
      path: '/statistic',
      component: Statistic,
      meta: { requiresAuth: true }, // 2. Защищаем страницу статистики
    },
    {
      path: '/timer',
      component: TimerRelax,
      meta: { requiresAuth: true }, // 3. Защищаем страницу времени релаксации
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiresAuth: false, hideHeader: true },
    },
    {
      path: '/register',
      component: RegisterView, // Исправили компонент на RegisterView
      meta: { requiresAuth: false, hideHeader: true },
    },
    // Ловушка для всех остальных несуществующих адресов (редирект на главную)
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// routes.ts
router.beforeEach((to, from, next) => {
  // Приводим к boolean: true если токен есть, false если токена нет
  const isAuthenticated = !!localStorage.getItem('user-token')

  // ПРАВИЛО 1: Если пользователь идет на /login или /register
  if (to.path === '/login' || to.path === '/register') {
    if (isAuthenticated) {
      return next('/') // Если уже залогинен — уводим на главную
    }
    return next() // Если НЕ залогинен — разрешаем остаться на форме входа
  }

  // ПРАВИЛО 2: Если страница требует авторизации
  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      return next() // Токен есть — пропускаем
    }
    return next('/login') // Токена нет — отправляем логиниться
  }

  // Для всех остальных страниц (если они появятся без мета-полей)
  next()
})
