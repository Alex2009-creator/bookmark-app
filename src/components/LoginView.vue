<template>
  <div class="auth-login">
    <div class="auth-login__logo">
      <img src="../assets/logo-auth.png" class="auth-login__img" />
    </div>
    <div class="auth-login-form">
      <!-- Общая ошибка, если сервер вернет 401 или другую проблему -->
      <div v-if="authStore.errorMessage" class="auth-login-form-error">
        {{ authStore.errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" novalidate>
        <!-- Поле Пользователь (Логин/Email) -->
        <BaseInput
          v-model="username"
          placeholder="Имя пользователя"
          autocomplete="username"
          :disabled="authStore.isLoading"
          :error="errors.username"
        />

        <!-- Поле Пароль -->
        <BaseInput
          v-model="password"
          type="password"
          placeholder="Пароль"
          autocomplete="current-password"
          :disabled="authStore.isLoading"
          :error="errors.password"
        />

        <!-- Кнопка отправки формы -->
        <button type="submit" class="auth-login-form-submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Вход...' : 'Войти в приложение' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from './AppInput.vue'
import { useRouter } from 'vue-router'
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

const handleLogin = async () => {
  // Простая валидация перед отправкой
  errors.username = !username.value ? 'Введите имя пользователя' : ''
  errors.password = !password.value ? 'Введите пароль' : ''

  if (errors.username || errors.password) return

  // Вызываем экшен из стора, передавая объект
  const success = await authStore.login({
    username: username.value,
    password: password.value,
  })

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
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
}

.auth-login-form-submit {
  width: 100%;
  min-width: 320px;
  margin-top: 55px;
  padding: 16px 8px;
  background-color: var(--background-btn); /* Цвет Vue */
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  font-family: Alegreya Sans;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-login-form-submit:hover {
  background-color: #35495e;
}
</style>
