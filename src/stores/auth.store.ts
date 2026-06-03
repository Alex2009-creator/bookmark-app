import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Импортируем созданные интерфейсы (используем type для чистоты TypeScript)
import type { LoginResponse, ErrorResponse, LoginPayload } from '../interfaces/auth.interface'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('user-token'))
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const isAuthenticated = computed<boolean>(() => !!token.value)

  // Используем интерфейс LoginPayload для аргументов (или передаем username и password строками)
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

      if (!response.ok || (data as ErrorResponse).status === 'error') {
        const errorData = data as ErrorResponse
        throw new Error(errorData.message || 'Произошла ошибка при входе')
      }

      const successData = data as LoginResponse
      token.value = successData.token
      localStorage.setItem('user-token', successData.token)

      return true
    } catch (error: any) {
      errorMessage.value = error.message || 'Ошибка сети'
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
    logout,
  }
})
