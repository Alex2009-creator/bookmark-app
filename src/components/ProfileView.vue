<template>
  <div class="profile-container">
    <h2>Личный кабинет</h2>

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
        <div class="profile-info">
            <p class="profile-label">Имя пользователя:</p>
            <p class="profile-value">{{ profileStore.user.username }}</p>
        </div>

        <div class="profile-info">
            <p class="profile-label">Электронная почта:</p>
            <p class="profile-value">{{ profileStore.user.email }}</p>
        </div>

        <!-- Отображаем дату последнего входа, если она пришла с бэкенда -->
        <div v-if="profileStore.user.last_login_at" class="profile-info">
            <p class="profile-label">Последний вход в систему:</p>
            <p class="profile-value">
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
  background: rgba(255, 255, 255, 0.05); /* Подходит под темный фон */
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--color-text-secondary);
}

.profile-info {
  margin-bottom: 16px;
}

.profile-info:last-child {
  margin-bottom: 0;
}

.profile-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 4px 0;
}

.profile-value {
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