import { defineStore } from 'pinia'
import { ref } from 'vue'
// Заменяем импорт useAuthStore на protectedFetch
import { protectedFetch } from '../utils/api' 
import type { UserProfile } from '../interfaces/profile.interface'

export const useProfileStore = defineStore('profile', () => {    
    
    const user = ref<UserProfile | null>(null)
    const isLoading = ref<boolean>(false)
    const errorMessage = ref<string | null>(null)

    // --- МЕТОД ПОЛУЧЕНИЯ ПРОФИЛЯ ---
    async function fetchProfile(): Promise<boolean> {
        isLoading.value = true
        errorMessage.value = null

        try { 
            // Используем protectedFetch. URL пишем относительно базового (без /api)
            const response = await protectedFetch('/profile', { 
                method: 'GET'
                // headers с Content-Type и Authorization добавятся автоматически!
            })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Эндпоинт профиля не найден (Ошибка 404). Проверьте URL в коде.')
                }
                throw new Error(`Ошибка сервера: статус ${response.status}`)
            }

            const resData = await response.json()

            if (resData.status === 'error') {
                throw new Error(resData.message || 'Не удалось загрузить профиль')
            }

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

    // --- ДОБАВЛЕННЫЙ МЕТОД ОТПРАВКИ СОСТОЯНИЯ ---
    async function sendFeeling(type: string, value: number = 1): Promise<boolean> {
        isLoading.value = true
        errorMessage.value = null

        try {
            // Запрос идет на относительный URL (базовый http://localhost:3000/api уже внутри protectedFetch)
            const response = await protectedFetch('/stats', {
                method: 'POST',
                body: JSON.stringify({ type, value })
            })

            if (!response.ok) {
                throw new Error(`Ошибка сервера при сохранении: статус ${response.status}`)
            }

            const resData = await response.json()

            if (resData.status === 'error') {
                throw new Error(resData.message || 'Не удалось сохранить статистику')
            }

            return true
        } catch (error: any) {
            console.error('Ошибка при отправке состояния:', error)
            errorMessage.value = error.message || 'Ошибка сети при отправке состояния'
            return false
        } finally {
            isLoading.value = false
        }
    }

    // --- ОЧИСТКА ПРОФИЛЯ ---
    function clearProfile() {
        user.value = null
    }

    // Возвращаем все переменные и функции, чтобы они были доступны в компонентах
    return {
        user,
        isLoading,
        errorMessage,
        fetchProfile,
        clearProfile,
        sendFeeling // <-- Теперь функция экспортируется корректно!
    }
})