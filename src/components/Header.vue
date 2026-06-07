<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useProfileStore } from '../stores/profile.store'
import IconPlay from './icons/IconPlay.vue'
import IconChart from './icons/IconChart.vue'
import IconExit from './icons/IconExit.vue'

const authStore = useAuthStore()
const profileStore = useProfileStore() // Подключаем profileStore
const router = useRouter()

// Функция для обработки выхода
async function handleLogout() {
  profileStore.clearProfile() // 1. Сначала очищаем данные профиля
  authStore.logout() // 2. Стираем токен
  await router.push('/login')
}
</script>

<template>
  <header class="box-header">
    <div class="box-header__logo">
      <img src="../assets/logo.png" class="box-header__img" />
    </div>
    <div class="box-header-nav">
      <router-link to="/" class="box-header-nav__item">
        <IconPlay class="box-header-nav__icon" />
        <p class="box-header-nav__text">Медитация</p>
      </router-link>
      <router-link to="/statistic" class="box-header-nav__item">
        <IconChart class="box-header-nav__icon" />
        <p class="box-header-nav__text">Статистика</p>
      </router-link>
      <router-link to="/timer" class="box-header-nav__item">
        <p class="box-header-nav__text">Время</p>
      </router-link>

      <!-- Используем модификатор @click.stop.prevent для точного перехвата события -->
      <div
        @click.stop.prevent="handleLogout"
        class="box-header-nav__item box-header-nav__item--btn"
      >
        <!-- Добавлен класс box-header-nav__icon -->
        <IconExit class="box-header-nav__icon" />
        <p class="box-header-nav__text">Выход</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.box-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.box-header__logo {
  height: 190px;
  overflow: hidden;
}

.box-header__img {
  object-fit: cover;
  object-position: top;
}

.box-header-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.box-header-nav__item {
  width: 210px;
  border-right: 3px #3a5051 solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text-secondary);
  stroke: var(--color-text-secondary);
  text-decoration: none;
}

.box-header-nav__item:hover {
  color: var(--color-text-primary);
  stroke: var(--color-text-primary);
  background-color: transparent;
}

.box-header-nav__item:last-child {
  border: none;
}

.box-header-nav__item--btn {
  cursor: pointer;
  user-select: none; /* Запрещает случайное выделение текста при клике */
}

/* клики проходят СКВОЗЬ иконку прямо на родительский div */
.box-header-nav__icon {
  pointer-events: none;
}
</style>
