import { useAuthStore } from '../stores/auth.store'

const BASE_URL = 'http://localhost:3000/api'

/**
 * Обертка над встроенным fetch, которая автоматически добавляет Bearer токен
 * и обрабатывает ошибку 401 (Unauthorized).
 */
export async function protectedFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const authStore = useAuthStore()
  const token = authStore.token

  // Создаем объект Headers на основе переданных или пустых настроек
  const headers = new Headers(options.headers)

  // Устанавливаем Content-Type по умолчанию для JSON, если он не был задан вручную
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // Если токен есть в Pinia, добавляем его в формате Bearer
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Формируем финальные настройки запроса
  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    // Выполняем стандартный fetch запрос
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      // Предотвращаем запуск запроса, если текущий URL и endpoint дублируются
      ...config,
    })

    // Если бэкенд ответил 401, токен недействителен — сбрасываем авторизацию
    if (response.status === 401) {
      authStore.logout()
      
      // Необязательно: если используется vue-router, здесь можно сделать редирект:
      // router.push('/login')
      
      throw new Error('Сессия истекла. Пожалуйста, авторизуйтесь заново.')
    }

    return response
  } catch (error: any) {
    // Пробрасываем ошибку дальше для обработки в компонентах
    throw new Error(error.message || 'Ошибка сетевого запроса')
  }
}