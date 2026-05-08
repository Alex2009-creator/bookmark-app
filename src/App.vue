<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Card from './components/RelaxCard.vue'

  const meditations = ref([]);
  const status = ref('idle');  // начальный статус

  const fetchMeditations = async () => {
    status.value = 'loading';
    try {      
      const response = await fetch('http://localhost:3000/api/meditations');

      if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

      const result = await response.json();

      // Сохраняем массив из вложенного объекта data.meditations
      meditations.value = result.data.meditations;
      status.value = 'success';

    } catch (error) {
        console.error('Ошибка при загрузке:', error);
        status.value = 'error';
    }
  };

  // Запускаем загрузку при монтировании
  onMounted(() => {
    fetchMeditations();
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
        v-if="status === 'loading'"
        class="box-main__container">
      >
        Загрузка данных...
      </div>

      <!-- Ошибка -->
      <div
        v-else-if="status === 'error'"
        class="box-main__error"
      >
        Не удалось загрузить данные. Проверьте, запущен ли сервер.
      </div>

      <!-- Отображение данных -->
      <div v-else class="box-main__container">
        <Card
          v-for="item in meditations"
          :key="item.id"
          :title="item.title"
          :description="item.description"
          :duration="item.duration_min"
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
