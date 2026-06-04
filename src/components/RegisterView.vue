<template>
  <div class="auth-register">
    <div class="auth-register__logo">
      <img src="../assets/logo-auth.png" class="auth-register__img" />
    </div>

    <div class="auth-register-form">
      <!-- Ошибка с бэкенда -->
      <div v-if="authStore.errorMessage" class="auth-register-error">
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
        <button type="submit" class="auth-register-submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Регистрация...' : 'Создать аккаунт' }}
        </button>
      </form>

      <!-- Ссылка на страницу логина -->
      <div class="auth-register-login">
        <router-link to="/login" class="auth-register-login__link">
          <span class="auth-register-login__text">Войти</span>
        </router-link>
    </div> 
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

  // 1. Регистрируем пользователя
  const isRegistered = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value,
  })

  if (isRegistered) {
    // 2. Автоматически логиним пользователя, используя те же данные
    const isLoggedIn = await authStore.login({
      username: username.value,
      password: password.value,
    })

    if (isLoggedIn) {
      // 3. Только теперь отправляем на главную
      router.push('/')
    }
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

.auth-register__img {
  width: 202px;
  height: 213px;
}

.auth-register-form {
  padding: 10px;
  background: transparent;
}

.auth-register-error {
  margin-bottom: 20px;
  background-color: transparent;
  border: none;
  color: var(--color-text-error);
  font-size: 14px;
  text-align: center;
}

.auth-register-submit {
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
  font-family: Alegreya Sans;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-register-login {
    margin: 20px 0;
    padding: 10px;
    text-align: center;
}

.auth-register-login__link {
    text-decoration: none;
    color: var(--background-btn);
}

.auth-register-login__link:hover {
    background-color: transparent;
    color: var(--color-text-primary);
}
</style>
