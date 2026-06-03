<template>
  <div class="auth-register">
    <div class="auth-register__logo">
      <img src="../assets/logo-auth.png" class="auth-content__img" />
    </div>

    <div class="register-form-container">
      <!-- Ошибка с бэкенда -->
      <div v-if="authStore.errorMessage" class="form-summary-error">
        {{ authStore.errorMessage }}
      </div>

      <form @submit.prevent="handleRegister" novalidate>
        <!-- Имя пользователя -->
        <BaseInput
          v-model="username"
          placeholder="Имя пользователя"
          autocomplete="username"
          :disabled="authStore.isLoading"
          :error="errors.username"
        />

        <!-- Email -->
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Электронная почта"
          autocomplete="email"
          :disabled="authStore.isLoading"
          :error="errors.email"
        />

        <!-- Пароль -->
        <BaseInput
          v-model="password"
          type="password"
          placeholder="Пароль"
          autocomplete="new-password"
          :disabled="authStore.isLoading"
          :error="errors.password"
        />

        <!-- Кнопка отправки -->
        <button type="submit" class="submit-btn" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Регистрация...' : 'Создать аккаунт' }}
        </button>
      </form>

      <!-- Ссылка на страницу логина -->
      <div class="auth-link-container">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from './AppInput.vue' // убедитесь в правильности пути к вашему AppInput.vue
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

// Поля формы
const username = ref('')
const email = ref('')
const password = ref('')

// Ошибки локальной валидации
const errors = reactive({
  username: '',
  email: '',
  password: '',
})

const handleRegister = async () => {
  // Локальная валидация перед отправкой
  errors.username = !username.value ? 'Введите имя пользователя' : ''
  errors.email = !email.value
    ? 'Введите адрес почты'
    : !email.value.includes('@')
      ? 'Некорректный email'
      : ''
  errors.password = password.value.length < 6 ? 'Пароль должен быть не менее 6 знаков' : ''

  if (errors.username || errors.email || errors.password) return

  // Вызываем метод стора
  const success = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value,
  })

  if (success) {
    // После успешной регистрации отправляем на главную
    router.push('/')
  }
}
</script>

<style scoped>
/* Стили полностью повторяют вашу страницу LoginView.vue */
.auth-register {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url('../assets/bg-form.png');
  background-size: cover;
  background-position: center;
}
.register-form-container {
  padding: 10px;
  background: transparent;
}
.form-summary-error {
  padding: 12px;
  margin-bottom: 20px;
  background-color: #fde8e8;
  border: 1px solid #f8b4b4;
  border-radius: 4px;
  color: #e74c3c;
  font-size: 14px;
}
.submit-btn {
  width: 100%;
  min-width: 320px;
  margin-top: 40px;
  padding: 16px 8px;
  background-color: var(--background-btn);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
}
.submit-btn:disabled {
  background-color: #a8ebd0;
}
.auth-link-container {
  margin-top: 20px;
  text-align: center;
  color: #555;
  font-size: 16px;
}
.auth-link-container a {
  color: var(--background-btn);
  font-weight: bold;
  text-decoration: none;
}
</style>
