export interface UserProfile {
  id: number
  username: string
  email: string
  last_login_at?: string
}

// интерфейс ответа от сервера, чтобы сделать код стора еще строже
export interface ProfileResponse {
  status: 'success' | 'error'
  message?: string
  data?: {
    user: UserProfile
  }
}
