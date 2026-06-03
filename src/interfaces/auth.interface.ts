// Данные, которые мы отправляем на сервер
export interface LoginPayload {
  username: string
  password: string
}

// Успешный ответ сервера (токен)
export interface LoginResponse {
  token: string
  status?: string
  message?: string
}

// Ответ сервера при ошибке
export interface ErrorResponse {
  status: 'error'
  message: string
}

// Регистрация

export interface RegisterPayload {
  username: string
  email: string
  password: string
}
