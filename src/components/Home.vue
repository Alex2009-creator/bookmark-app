<script setup lang="ts">
import { onMounted } from 'vue'
import RelaxCard from './RelaxCard.vue'
import { useRelaxStore } from '../stores/relax.store'

const store = useRelaxStore()

// Запускаем загрузку при монтировании
onMounted(() => {
  if (store.items.length === 0) {
    store.fetchMeditations()
  }
})
</script>

<template>
  <div class="box-main">
    <div class="box-main__sidebar">
      <div class="box-main__photo">
        <img src="../assets/user-photo.png" class="box-main__img" />
      </div>
      <h2 class="box-main__title">Добро пожаловать, Наталья!</h2>
      <p class="box-main__description">Как вы сегодня себя чувствуете?</p>
      <div class="box-main-container">
        <div class="box-main-container-icon">
          <div class="box-main-container-icon__img">
            <img src="../assets/calmness.png" class="box-main-container__img" />
          </div>
          <p class="box-main-container__description">Спокойно</p>
        </div>
        <div class="box-main-container-icon">
          <div class="box-main-container-icon__img">
            <img src="../assets/relaxation.png" class="box-main-container__img" />
          </div>
          <p class="box-main-container__description">Расслабленно</p>
        </div>
        <div class="box-main-container-icon">
          <div class="box-main-container-icon__img">
            <img src="../assets/concentration.png" class="box-main-container__img" />
          </div>
          <p class="box-main-container__description">Фокусировано</p>
        </div>
        <div class="box-main-container-icon">
          <div class="box-main-container-icon__img">
            <img src="../assets/anxiety.png" class="box-main-container__img" />
          </div>
          <p class="box-main-container__description">Тревожно</p>
        </div>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="store.status === 'loading'" class="box-main__container">Загрузка данных...</div>

    <!-- Ошибка -->
    <div v-else-if="store.status === 'error'" class="box-main__error">
      Не удалось загрузить данные. Проверьте, запущен ли сервер.
    </div>

    <!-- Отображение данных -->
    <div v-else-if="store.status === 'success'" class="box-main__container">
      <RelaxCard
        v-for="item in store.items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :duration_min="item.duration_min"
      />
    </div>
  </div>
</template>

<style scoped>
.box-main {
  padding: 0 50px;
  display: flex;
  flex-direction: row;
}

.box-main__sidebar {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.box-main__photo {
  width: auto;
}

.box-main__img {
  width: 130px;
  height: 130px;
}

.box-main__title {
  color: var(--color-text-primary);
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 0;
}

.box-main__description {
  color: var(--color-text-secondary);
  font-size: 22px;
  margin-top: 10px;
}

.box-main__container {
  min-height: max-content;
  min-width: max-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
}

.box-main-card__title {
  font-weight: 500;
  font-size: 25px;
}

.box-main__error {
  color: red;
  font-weight: bold;
}

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

.box-main-container-icon__img {
  width: 62px;
  height: 62px;
  margin: 0 20px;
  border-radius: 20px;
  background-color: var(--background-icon);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
