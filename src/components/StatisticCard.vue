<template>
  <div class="stat-card">
    <p class="stat-card__value">{{ value }}</p>
    <h3 class="stat-card__title">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
}>()
</script>

<style scoped>
.stat-card {
  width: 300px;
  height: 200px;
  background-image: url('../assets/bg-statcard.png');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: start;
}
.stat-card__title {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
}
.stat-card__value {
  width: 100%;
  font-size: 60px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 0.1;
  text-align: end;
}
</style>
