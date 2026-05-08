<script setup lang="ts">
  import { onMounted } from 'vue'
  import RelaxCard from './components/RelaxCard.vue'  
  import { useRelaxStore } from './stores/relax.store';

  const store = useRelaxStore()

  // Запускаем загрузку при монтировании
  onMounted(() => {
    if (store.items.length === 0) {
      store.fetchMeditations();
  }
  });
</script>

<template>
  <div class="box">
    <header class="box-header">
      <div class="box-header__logo">
        <img src="./assets/logo.png" />
      </div>
      <div class="box-header__nav"></div>
    </header>
    <main class="box-main">
      <div class="box-main__sidebar">
        <div class="box-main__photo">
          <img src="./assets/user-photo.png" class="box-main__img" />
        </div>
        <h2 class="box-main__title">Добро пожаловать, Наталья!</h2>
      </div>

      <!-- Загрузка -->
      <div
        v-if="store.status === 'loading'"
        class="box-main__container"
      >
        Загрузка данных...
      </div>

      <!-- Ошибка -->
      <div
        v-else-if="store.status === 'error'"
        class="box-main__error"
      >
        Не удалось загрузить данные. Проверьте, запущен ли сервер.
      </div>

      <!-- Отображение данных -->
      <div
        v-else-if="store.status === 'success'"
        class="box-main__container"
      >
        <RelaxCard
          v-for="item in store.items"
          :key="item.id"
          :title="item.title"
          :description="item.description"
          :duration_min="item.duration_min"
        />        
      </div>
    </main>
  </div>
</template>

<style scoped>
  .box {
    min-height: 100vh;
    background-color: var(--background-bg);
  }

  .box-header {
    height: 190px;
  }

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
</style>
