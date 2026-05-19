<script setup lang="ts">
  import IconPlay from './components/icons/IconPlay.vue';
  import IconChart from './components/icons/IconChart.vue';
  import IconExit from './components/icons/IconExit.vue';
</script>

<template>
  <div class="box">
    <header class="box-header">
      <div class="box-header__logo">        
        <img src="./assets/logo.png" class="box-header__img" />
      </div>
      <div class="box-header-nav">
        <router-link to="/" class="box-header-nav__item">
          <IconPlay />
          <p class="box-header-nav__text">Медитация</p>
        </router-link>
        <router-link to="/statistic" class="box-header-nav__item">
          <IconChart />
          <p class="box-header-nav__text">Статистика</p>
        </router-link>
        <div class="box-header-nav__item">
          <IconExit />
          <p class="box-header-nav__text">Выход</p>
        </div>
      </div>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
  .box {
    min-height: 100vh;
    background-color: var(--background-bg);
  }

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
    border-right: 3px #3A5051 solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-text-secondary);
    stroke: var(--color-text-secondary);
  }

  .box-header-nav__item:hover {
    color: var(--color-text-primary);
    stroke: var(--color-text-primary);
    background-color: transparent;
  }

  .box-header-nav__item:last-child {    
    border: none;
  }
</style>
