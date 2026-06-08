<template>
  <div class="box-main">
    <!-- Состояние загрузки данных из стора профиля -->
    <div v-if="profileStore.statsStatus === 'loading'" class="box-main__loading">
      Загрузка статистики...
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="profileStore.statsStatus === 'error'" class="box-main__error">
      Не удалось загрузить данные. Проверьте, запущен ли сервер.
    </div>

    <!-- Отображение вычисленных блоков при успешной загрузке -->
    <div v-else-if="profileStore.statsStatus === 'success'" class="box-main__container">
      <!-- Передаем в каждую карточку уникальный заголовок и подсчитанное в Pinia значение -->
      <StatisticCard title="Минут медитации" :value="`${profileStore.totalDuration}`" />
      <StatisticCard title="Спокойные дни" :value="profileStore.calmDays" />
      <StatisticCard title="Расслабленные дни" :value="profileStore.relaxDays" />
      <StatisticCard title="Сконцентрированные дни" :value="profileStore.focusDays" />
      <StatisticCard title="Тревожные дни" :value="profileStore.anxietyDays" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import StatisticCard from './StatisticCard.vue'
import { useProfileStore } from '../stores/profile.store' // Импортируем обновленный стор профиля

const profileStore = useProfileStore()

// При монтировании страницы запрашиваем свежую статистику с сервера
onMounted(() => {
  profileStore.fetchStats()
})
</script>

<style scoped>
.box-main {
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.box-main__container {
  min-height: max-content;
  width: 100%;
  max-width: 1200px;
  display: grid;
  /* Сетка на 3 колонки, которая аккуратно распределит наши 5 карточек */
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  padding: 100px 20px 20px 50px;
}

.box-main__loading {
  font-size: 18px;
  color: var(--color-text-secondary, #666);
  padding: 100px;
  font-weight: 500;
}

.box-main__error {
  color: #e74c3c;
  font-weight: bold;
  padding: 100px;
  font-size: 18px;
}
</style>
