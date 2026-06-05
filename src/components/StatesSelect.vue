<script setup lang="ts">
import { ref } from 'vue'
import { useProfileStore } from '../stores/profile.store'

const profileStore = useProfileStore()
const successMessage = ref<string>('')

// Функция-обработчик клика по кнопке состояния
const selectState = async (type: 'feeling_calm' | 'feeling_relax' | 'feeling_focus' | 'feeling_anxiety') => {
  successMessage.value = ''
  
  // Отправляем тип состояния и дефолтное значение 1 на бэкенд
  const success = await profileStore.sendFeeling(type, 1)
  
  if (success) {
    successMessage.value = 'Состояние сохранено!'
    // Сбрасываем сообщение об успехе через 3 секунды
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}
</script>

<template>
    <div class="states-wrapper">
        <div class="box-main-container">
            <!-- Кнопка: Спокойно -->
            <div class="box-main-container-icon">
                <button 
                    class="box-main-container-icon__btn" 
                    :disabled="profileStore.isLoading"
                    @click="selectState('feeling_calm')"
                >
                    <img src="../assets/calmness.png" class="box-main-container__img" />
                </button>
                <p class="box-main-container__description">Спокойно</p>
            </div>

            <!-- Кнопка: Расслабленно -->
            <div class="box-main-container-icon">
                <button 
                    class="box-main-container-icon__btn" 
                    :disabled="profileStore.isLoading"
                    @click="selectState('feeling_relax')"
                >
                    <img src="../assets/relaxation.png" class="box-main-container__img" />
                </button>
                <p class="box-main-container__description">Расслабленно</p>
            </div>

            <!-- Кнопка: Фокусировано -->
            <div class="box-main-container-icon">
                <button 
                    class="box-main-container-icon__btn" 
                    :disabled="profileStore.isLoading"
                    @click="selectState('feeling_focus')"
                >
                    <img src="../assets/concentration.png" class="box-main-container__img" />
                </button>
                <p class="box-main-container__description">Фокусировано</p>
            </div>

            <!-- Кнопка: Тревожно -->
            <div class="box-main-container-icon">
                <button 
                    class="box-main-container-icon__btn" 
                    :disabled="profileStore.isLoading"
                    @click="selectState('feeling_anxiety')"
                >
                    <img src="../assets/anxiety.png" class="box-main-container__img" />
                </button>
                <p class="box-main-container__description">Тревожно</p>
            </div>
        </div>

        <!-- Системные уведомления -->
        <div class="notifications-container">
            <p v-if="profileStore.isLoading" class="msg info">Сохранение...</p>
            <p v-if="profileStore.errorMessage" class="msg error">{{ profileStore.errorMessage }}</p>
            <p v-if="successMessage" class="msg success">{{ successMessage }}</p>
        </div>
    </div>
</template>

<style scoped>
    .box-main-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .box-main-container__description {
        font-size: 12px;
        color: var(--background-icon);
    }

    .box-main-container-icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .box-main-container-icon__btn {
        width: 62px;
        height: 62px;
        margin: 0 20px;
        border-radius: 20px;
        background-color: var(--background-icon);
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        transition: opacity 0.2s ease, transform 0.1s ease;
    }

    .box-main-container-icon__btn:hover:not(:disabled) {
        cursor: pointer;
        opacity: 0.9;
    }

    .box-main-container-icon__btn:active:not(:disabled) {
        transform: scale(0.95);
    }

    .box-main-container-icon__btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Для системных сообщений */
    .notifications-container {
        margin-top: 10px;
        min-height: 20px;
        text-align: center;
    }

    .msg {
        font-size: 13px;
        margin: 0;
    }

    .error {
        color: var(--color-text-error);
    }

    .success {
        color: var(--color-text-success);
    }

    .info {
        color: var(--color-text-info);
    }
</style>