<script setup lang="ts"></script>

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
        <h2 class="box-main__title"></h2>
      </div>
      <div class="box-main__container"></div>
    </main>
  </div>
</template>

<style scoped>
.box {
  min-height: 100vh;
  background-color: var(--background-bg);
}

.box-main {
  padding: 50px;
}

.box-main__title {
  color: var(--color-text-primary);
  font-size: 30px;
  font-weight: 500;
}
</style>
