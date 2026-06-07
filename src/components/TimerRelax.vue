<template>
  <div class="timer-relax">
    <div class="timer-relax__label">
      <p class="timer-relax__text">5:00</p>
    </div>
    <div class="timer-relax__title">Ежедневная</div>
    <p class="timer-relax__description">Стандартная медитация для ежедневной осознанности</p>
    <div class="timer-relax__label">
      <p class="timer-relax__text">5:00</p>
    </div>
  </div>
</template>

<style scoped>
.timer-relax {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.timer-relax__label {
  width: 250px;
  height: 250px;
  background-image: url('../assets/album-art.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-relax__text {
  font-size: 44px;
  color: var(--color-text-primary);
}
</style>
