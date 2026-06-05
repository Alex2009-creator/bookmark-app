<template>
    <div class="profile">
        <!-- Состояние загрузки -->
        <div v-if="profileStore.isLoading" class="profile-status">
            Загрузка данных профиля...
        </div>

        <!-- Ошибка, если запрос не удался -->
        <div v-else-if="profileStore.errorMessage" class="profile-error">
            {{ profileStore.errorMessage }}
        </div>

        <!-- Данные профиля отображаются, если объект user успешно получен -->
        <div v-else-if="profileStore.user" class="profile-card">
            <h2 class="profile-card__title">Добро пожаловать, {{ profileStore.user.username }}!</h2>
            <p class="profile-card__description">Как вы сегодня себя чувствуете?</p>

            <div class="profile-card-info">
                <p class="profile-card-info__label">Электронная почта:</p>
                <p class="profile-card-info__value">{{ profileStore.user.email }}</p>
            </div>

            <!-- Отображаем дату последнего входа, если она пришла с бэкенда -->
            <div v-if="profileStore.user.last_login_at" class="profile-card-info">
                <p class="profile-card-info__label">Последний вход в систему:</p>
                <p class="profile-card-info__value">
                    {{ new Date(profileStore.user.last_login_at).toLocaleString('ru-RU') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile.store'

const profileStore = useProfileStore()

// Делаем запрос к API автоматически при загрузке страницы
onMounted(async () => {
  await profileStore.fetchProfile()
})
</script>

<style scoped>
  .profile-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    font-family: Alegreya Sans, sans-serif;
  }

  .profile-card {
    background-color: transparent;
    margin-top: 20px;
    margin-bottom: 40px;
    padding: 0;
  }

  .profile-card__title {
    color: var(--color-text-primary);
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 0;
  }

  .profile-card__description {
    color: var(--color-text-secondary);
    font-size: 22px;
    margin-top: 10px;
  }

  .profile-card-info {
    margin-bottom: 16px;
  }

  .profile-card-info:last-child {
    margin-bottom: 0;
  }

  .profile-card-info__label {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin: 0 0 4px 0;
  }

  .profile-card-info__value {
    font-size: 20px;
    color: var(--color-text-primary);
    font-weight: 500;
    margin: 0;
  }

  .profile-status {
    text-align: center;
    color: var(--color-text-secondary);
  }

  .profile-error {
    text-align: center;
    color: var(--color-text-error);
  }
</style>