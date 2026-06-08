import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { protectedFetch } from '../utils/api'
import type { UserProfile } from '../interfaces/profile.interface'
import type { StatSummary } from '../interfaces/stat.interface'

export const useProfileStore = defineStore('profile', () => {
  // --- СОСТОЯНИЕ (STATE) ---
  const user = ref<UserProfile | null>(null)
  const isLoading = ref<boolean>(false)
  const statsStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
  const errorMessage = ref<string | null>(null)

  // Используем импортированный интерфейс
  const summary = ref<StatSummary>({
    total_minutes: 0,
    total_calm: 0,
    total_relax: 0,
    total_focus: 0,
    total_anxiety: 0,
  })

  // --- ГЕТТЕРЫ (GETTERS) ---
  // Просто прокидываем готовые цифры из объекта summary в компонент
  const totalDuration = computed(() => summary.value.total_minutes)
  const calmDays = computed(() => summary.value.total_calm)
  const relaxDays = computed(() => summary.value.total_relax)
  const focusDays = computed(() => summary.value.total_focus)
  const anxietyDays = computed(() => summary.value.total_anxiety)

  // --- МЕТОД ПОЛУЧЕНИЯ ПРОФИЛЯ ---
  async function fetchProfile(): Promise<boolean> {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await protectedFetch('/profile', { method: 'GET' })
      if (!response.ok) throw new Error(`Ошибка сервера: статус ${response.status}`)
      const resData = await response.json()
      if (resData.status === 'error')
        throw new Error(resData.message || 'Не удалось загрузить профиль')
      if (resData.data && resData.data.user) {
        user.value = resData.data.user
        return true
      }
      throw new Error('В ответе сервера отсутствуют данные пользователя')
    } catch (error: any) {
      errorMessage.value = error.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  // --- МЕТОД ПОЛУЧЕНИЯ СТАТИСТИКИ (ОБНОВЛЕННЫЙ) ---
  async function fetchStats(): Promise<void> {
    statsStatus.value = 'loading'
    errorMessage.value = null

    try {
      const response = await protectedFetch('/stats', { method: 'GET' })
      if (!response.ok) throw new Error(`Ошибка сервера: статус ${response.status}`)

      const resData = await response.json()

      if (resData && resData.status === 'error') {
        throw new Error(resData.message || 'Не удалось загрузить статистику')
      }

      // Направляем данные строго в наш объект summary
      if (resData && resData.data && resData.data.summary) {
        summary.value = resData.data.summary as StatSummary
      }

      statsStatus.value = 'success'
    } catch (error: any) {
      console.error('КРИТИЧЕСКАЯ ОШИБКА В FETCH_STATS:', error)
      errorMessage.value = error.message || 'Ошибка сети при загрузке статистики'
      statsStatus.value = 'error'
    }
  }

  // --- МЕТОД ОТПРАВКИ СОСТОЯНИЯ ---
  async function sendFeeling(type: string, value: number = 1): Promise<boolean> {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await protectedFetch('/stats', {
        method: 'POST',
        body: JSON.stringify({ type, value }),
      })
      if (!response.ok) throw new Error(`Ошибка сервера при сохранении: статус ${response.status}`)
      const resData = await response.json()
      if (resData.status === 'error')
        throw new Error(resData.message || 'Не удалось сохранить статистику')
      return true
    } catch (error: any) {
      errorMessage.value = error.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  function clearProfile() {
    user.value = null
    summary.value = {
      total_minutes: 0,
      total_calm: 0,
      total_relax: 0,
      total_focus: 0,
      total_anxiety: 0,
    }
    statsStatus.value = 'idle'
  }

  return {
    user,
    isLoading,
    statsStatus,
    errorMessage,
    totalDuration,
    calmDays,
    relaxDays,
    focusDays,
    anxietyDays,
    fetchProfile,
    fetchStats,
    clearProfile,
    sendFeeling,
  }
})
