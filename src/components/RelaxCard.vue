<script setup lang="ts">
import type { CardProps } from '@/interfaces/cardprops.interface'
import ButtonStart from './ButtonStart.vue'
import { useRouter } from 'vue-router'
import { useTimerStore } from '../stores/timer.store' // путь к вашему стору

const props = defineProps<CardProps>()
const router = useRouter()
const timerStore = useTimerStore()

const handleStart = () => {
  // 1. Сохраняем данные в Pinia
  timerStore.startSession(props.title, props.description, props.duration_min)
  // 2. Переходим на страницу таймера
  router.push('/timer')
}
</script>

<template>
  <div class="box-main-card">
    <h1 class="box-main-card__title">{{ title }}</h1>
    <p class="box-main-card__text">{{ description }}</p>
    <div class="box-main-card-container">
      <!-- Слушаем событие @start от кнопки -->
      <ButtonStart @start="handleStart" />
      <p class="box-main-card__label">{{ duration_min }} мин</p>
    </div>
  </div>
</template>

<style scoped>
.box-main-card {
  width: 340px;
  height: 170px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: var(--background-card);
  padding: 10px 20px;
}

.box-main-card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.box-main-card__title {
  font-weight: 500;
  font-size: 25px;
  color: var(--color-text);
}

.box-main-card__text {
  font-weight: 500;
  font-size: 15px;
  color: var(--color-text);
}

.box-main-card__label {
  font-weight: 500;
  font-size: 15px;
  color: var(--color-text-light);
  margin-right: 13px;
}
</style>
