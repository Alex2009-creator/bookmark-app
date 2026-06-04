import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.store'
// Импортируем созданные интерфейсы
import type { UserProfile, ProfileResponse } from '../interfaces/profile.interface'

export const useProfileStore = defineStore('profile', () => {
    const authStore = useAuthStore() // Доступ к токену из authStore
    
    const user = ref<UserProfile | null>(null)
    const isLoading = ref<boolean>(false)
    const errorMessage = ref<string | null>(null)

    // Метод получения профиля с сервера
    async function fetchProfile(): Promise<boolean> {
        isLoading.value = true
        errorMessage.value = null

        try { 
            const response = await fetch('http://localhost:3000/api/profile', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`
                }
            })

            // 1. Сначала проверяем статус ответа, чтобы не парсить HTML в случае 404 ошибки
            if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Эндпоинт профиля не найден (Ошибка 404). Проверьте URL в коде.')
            }
            throw new Error(`Ошибка сервера: статус ${response.status}`)
            }

            // 2. Теперь безопасно парсим JSON, так как сервер вернул 200 OK
            const resData = await response.json()

            if (resData.status === 'error') {
                throw new Error(resData.message || 'Не удалось загрузить профиль')
            }

            // 3. ПРАВКА ПОД ВАШУ СТРУКТУРУ: Записываем данные из data.data.user
            if (resData.data && resData.data.user) {
                user.value = resData.data.user
                return true
            } else {
                throw new Error('В ответе сервера отсутствуют данные пользователя')
            }

        } catch (error: any) {
            console.error('Ошибка при загрузке профиля:', error)
            errorMessage.value = error.message || 'Ошибка сети при загрузке профиля'
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Очистка профиля (вызывается при разлогинивании)
    function clearProfile() {
        user.value = null
    }

    return {
        user,
        isLoading,
        errorMessage,
        fetchProfile,
        clearProfile
    }
})