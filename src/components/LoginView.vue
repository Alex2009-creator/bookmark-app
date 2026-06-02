<template>
    <div class="auth-login"> 
        <div class="auth-login__logo">
            <img src="../assets/logo-auth.png" class="auth-content__img" />        
        </div>   
        <div class="login-form-container">
            <!-- Общая ошибка, если сервер вернет 401 или другую проблему -->
            <div v-if="formError" class="form-summary-error">
            {{ formError }}
            </div>

            <form @submit.prevent="handleLogin" novalidate>
            <!-- Поле Пользователь (Логин/Email) -->
            <BaseInput
                v-model="username"                
                placeholder="Имя пользователя"
                autocomplete="username"
                :disabled="isLoading"
                :error="errors.username"
            />

            <!-- Поле Пароль -->
            <BaseInput
                v-model="password"                
                type="password"
                placeholder="Пароль"
                autocomplete="current-password"
                :disabled="isLoading"
                :error="errors.password"
            />

            <!-- Кнопка отправки формы -->
            <button 
                type="submit" 
                class="submit-btn" 
                :disabled="isLoading"
            >
                {{ isLoading ? 'Вход...' : 'Войти в приложение' }}
            </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import BaseInput from './AppInput.vue'

    // Состояния полей формы
    const username = ref('')
    const password = ref('')

    // Состояния процесса отправки и глобальной ошибки
    const isLoading = ref(false)
    const formError = ref('')

    // Объект для хранения ошибок валидации отдельных полей
    const errors = reactive({
    username: '',
    password: ''
    })

    // Простая валидация перед отправкой
    const validateForm = () => {
        let isValid = true
        
        // Валидация пользователя
        if (!username.value.trim()) {
            errors.username = 'Поле обязательно для заполнения'
            isValid = false
        } else {
            errors.username = ''
        }

        // Валидация пароля
        if (!password.value) {
            errors.password = 'Введите пароль'
            isValid = false
        } else if (password.value.length < 6) {
            errors.password = 'Пароль должен быть не менее 6 символов'
            isValid = false
        } else {
            errors.password = ''
        }

        return isValid
    }

    // Обработчик отправки формы
    const handleLogin = async () => {
        formError.value = ''
        
        // Если валидация не прошла, прерываем отправку
        if (!validateForm()) return

        try {
            isLoading.value = true
            
            // Имитация запроса к API (замените на ваш axios/fetch/pinia action)
            await new Promise((resolve, reject) => {
            setTimeout(() => {
                // Пример проверки для демонстрации ошибки сервера
                if (username.value === 'admin' && password.value === '123456') {
                    resolve()
                } else {
                    reject(new Error('Неверное имя пользователя или пароль'))
                }
            }, 1500)
            })

            alert('Успешная авторизация!')
            // Здесь обычно идет редирект: router.push('/dashboard')

        } catch (error) {
            // Выводим ошибку, полученную от сервера
            formError.value = error.message || 'Произошла ошибка при входе'
        } finally {
            isLoading.value = false
        }
    }
</script>

<style scoped>
    .auth-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url("../assets/bg-form.png");
    }
    .auth-content__img {
        width: 202px;
        height: 213px;
    }

    .login-form-container {
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
        margin-top: 55px;
        padding: 16px 8px;
        background-color: var(--background-btn); /* Цвет Vue */
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 25px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-btn:hover:not(:disabled) {
        background-color: #35495e;
    }

    .submit-btn:disabled {
        background-color: #a8ebd0;
        cursor: not-allowed;
    }
</style>