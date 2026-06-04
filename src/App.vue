<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'

const route = useRoute()
</script>

<template>
  <div class="box">
    <Header v-if="!route.meta.hideHeader" />
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.box {
  min-height: 100vh;
  background-color: var(--background-bg);
}
</style>
