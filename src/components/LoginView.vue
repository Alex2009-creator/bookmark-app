<template>
  <div class="auth-login">
    <div class="auth-login__logo">
      <img src="../assets/logo-auth.png" class="auth-register__img" />
    </div>
    <div class="auth-login-form">
      <!-- Общая ошибка из Pinia бэкенда -->
      <div v-if="authStore.errorMessage" class="auth-login-form-error">
        {{ authStore.errorMessage }}
      </div>

      <form @submit.prevent novalidate>
        <!-- Поле Пользователь -->
        <BaseInput
          v-model="username"
          placeholder="Имя пользователя"
          autocomplete="username"
          :disabled="authStore.isLoading"
          :error="errors.username"
          @input="clearBackendError" 
        />

        <!-- Поле Пароль -->
        <BaseInput
          v-model="password"
          type="password"
          placeholder="Пароль"
          autocomplete="current-password"
          :disabled="authStore.isLoading"
          :error="errors.password"
          @input="clearBackendError"
        />

        <button
            type="submit"
            @click.prevent="handleLogin"            
            :disabled="authStore.isLoading"
            class="auth-login-form-submit"
        >
          {{ authStore.isLoading ? 'Вход...' : 'Войти в приложение' }}
        </button>
      </form>
    </div>
    <!-- Ссылка на страницу регистрации -->
    <div class="auth-login-register">
      <router-link to="/register" class="auth-login-register__link">
        <span class="auth-login-register__text">Зарегистрироваться</span>
      </router-link>
    </div>    
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from './AppInput.vue'
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

// Состояния полей формы
const username = ref('')
const password = ref('')

// Объект для хранения ошибок валидации отдельных полей (фронтенд-валидация)
const errors = reactive({
  username: '',
  password: '',
})

// Функция очистки ошибки бэкенда при вводе текста в инпуты
const clearBackendError = () => {
  if (authStore.errorMessage) {
    authStore.errorMessage = null
  }
}

const handleLogin = async () => {
  // 1. Сброс локальных ошибок перед новой проверкой
  errors.username = ''
  errors.password = ''

  // 2. Простая валидация перед отправкой
  const trimmedUsername = username.value.trim()
  
  if (!trimmedUsername) {
    errors.username = 'Введите имя пользователя'
  }
  if (!password.value) {
    errors.password = 'Введите пароль'
  }

  // Если есть локальные ошибки — прерываем выполнение
  if (errors.username || errors.password) return

  // 3. Вызываем экшен из стора, передавая очищенные данные
  const success = await authStore.login({
    username: trimmedUsername,
    password: password.value,
  })

  // 4. Переход на главную при успешном ответе от сервера
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.auth-login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/bg-form.png');
  background-size: cover;
  background-position: center;
}
.auth-login__img {
  width: 202px;
  height: 213px;
}

.auth-login-form {
  padding: 10px;
  background: transparent;
}

.auth-login-form-error {
  margin-bottom: 20px;
  background-color: transparent;
  border: none;
  color: var(--color-text-error);
  font-size: 14px;
  text-align: center;
}

.auth-login-form-submit {
  width: 100%;
  min-width: 320px;
  margin-top: 55px;
  padding: 16px 8px;
  background-color: var(--background-btn);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  font-family: Alegreya Sans, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-login-form-submit:hover {
  background-color: var(--background-btn-additional);
}

.auth-login-form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-login-register {
  margin: 20px 0;
  padding: 10px;
  text-align: center;
}

.auth-login-register__link {
  text-decoration: none;
  color: var(--background-btn);
}

.auth-login-register__link:hover {
  background-color: transparent;
  color: var(--color-text-primary);
}
</style>