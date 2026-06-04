import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginPayload, RegisterPayload } from '../interfaces/auth.interface'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('user-token'))
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const isAuthenticated = computed<boolean>(() => !!token.value)

  // --- МЕТОД ЛОГИНА ---
  async function login({ username, password }: LoginPayload): Promise<boolean> {
    isLoading.value = true
    errorMessage.value = null

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Неверное имя пользователя или пароль')
      }

      // Добавлена проверка data.data?.token
      if (data.data && data.data.token) {
        token.value = data.data.token
        localStorage.setItem('user-token', data.data.token)
        return true
      } else {
        throw new Error('Сервер не вернул токен авторизации')
      }
    } catch (error: any) {
      errorMessage.value = error.message || 'Ошибка сети при авторизации'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // --- МЕТОД РЕГИСТРАЦИИ ---
  async function register({ username, email, password }: RegisterPayload): Promise<boolean> {
    isLoading.value = true
    errorMessage.value = null

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Произошла ошибка при регистрации')
      }

      // Проверяем токен по правильному пути на случай авто-входа после регистрации
      if (data.data && data.data.token) {
        token.value = data.data.token
        localStorage.setItem('user-token', data.data.token)
      }

      return true 
    } catch (error: any) {
      errorMessage.value = error.message || 'Ошибка сети при регистрации'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout(): void {
    token.value = null
    localStorage.removeItem('user-token')
  }

  return {
    token,
    isLoading,
    errorMessage,
    isAuthenticated,
    login,
    register,
    logout,
  }
})