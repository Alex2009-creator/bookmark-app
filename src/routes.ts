import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Statistic from './components/Statistic.vue'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue' // 1. Импортируем компонент регистрации

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true }, // 2. Защищаем главную страницу
    },
    {
      path: '/statistic',
      component: Statistic,
      meta: { requiresAuth: true }, // 2. Защищаем страницу статистики
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiresAuth: false, hideHeader: true },
    },
    {
      path: '/register',
      component: RegisterView, // 3. Исправили компонент на RegisterView
      meta: { requiresAuth: false, hideHeader: true },
    },
    // 4. Ловушка для всех остальных несуществующих адресов (редирект на главную)
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// 5. Добавляем глобальную проверку авторизации перед каждым переходом
router.beforeEach((to, from, next) => {
  // Получаем токен напрямую из localStorage
  const isAuthenticated = !!localStorage.getItem('user-token')

  // Если страница требует авторизации, а пользователь НЕ залогинен
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // Отправляем авторизовываться
  }
  // Если пользователь УЖЕ залогинен, но пытается зайти на страницы входа/регистрации
  else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/') // Уводим его на главную страницу
  }
  // В остальных случаях разрешаем переход
  else {
    next()
  }
})
