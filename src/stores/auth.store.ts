import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Добавляем импорт RegisterPayload
import type { LoginResponse, ErrorResponse, LoginPayload, RegisterPayload } from './auth.types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('user-token'))
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const isAuthenticated = computed<boolean>(() => !!token.value)

  // --- Метод логина (уже есть у вас) ---
  async function login({ username, password }: LoginPayload): Promise<boolean> {
    /* Ваш текущий код логина */
    return true
  }

  // --- НОВЫЙ МЕТОД: Регистрация ---
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

      // Проверяем ошибки бэкенда
      if (!response.ok || (data as ErrorResponse).status === 'error') {
        const errorData = data as ErrorResponse
        throw new Error(errorData.message || 'Произошла ошибка при регистрации')
      }

      // Если ваш бэкенд после регистрации СРАЗУ возвращает токен (автоматический вход)
      if (data.token) {
        token.value = data.token
        localStorage.setItem('user-token', data.token)
      }

      return true // Успешно зарегистрирован
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

  // ОБЯЗАТЕЛЬНО добавляем register в возвращаемый объект
  return {
    token,
    isLoading,
    errorMessage,
    isAuthenticated,
    login,
    register, // <- добавили сюда
    logout,
  }
})
