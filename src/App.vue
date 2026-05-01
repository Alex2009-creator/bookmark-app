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
        <div class="box-main__photo">
          <img src="./assets/user-photo.png" class="box-main__img" />
        </div>
        <h2 class="box-main__title">Добро пожаловать, Наталья!</h2>
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

.box-header {
  height: 190px;
}

.box-main {
  padding: 0 50px;
}

.box-main__sidebar {
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
</style>
