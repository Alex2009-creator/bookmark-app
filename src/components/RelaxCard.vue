<script setup lang="ts">
    type CardProps = {
        title: String,
        description: String,
        duration: Number,
    }

    const {
        title,
        description,
        duration
    } = defineProps<CardProps>();
</script>

<template>
    <div class="box-main-card">
        <h1 class="box-main-card__title">{{ title }}</h1>
        <p>{{ description }}</p>
        <p> {{ duration }} мин.</p>
    </div>
</template>

<style scoped>
    .box-main-card {
        width: 340px;
        height: 170px;
        border-radius: 20px;
        background-color: var(--background-card);
        padding: 20px;
    }
</style>