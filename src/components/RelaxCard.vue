<script setup lang="ts">
    import type { CardProps } from '@/interfaces/cardprops.interface'
import ButtonStart from './ButtonStart.vue';

    const {
        title,
        description,
        duration_min
    } = defineProps<CardProps>();
</script>

<template>
    <div class="box-main-card">
        <h1 class="box-main-card__title">{{ title }}</h1>
        <p class="box-main-card__text">{{ description }}</p>
        <div class="box-main-card-container">
            <ButtonStart />
            <p class="box-main-card__label">{{ duration_min }} мин</p>
        </div>
    </div>
</template>

<style scoped>
    .box-main-card {
        width: 340px;
        height: 170px;
        border-radius: 20px;
        background-color: var(--background-card);
        padding: 20px 30px;
    }

    .box-main-card-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .box-main-card__title {
        font-weight: 500;
        font-size: 25px;
        color: var(--color-text);
    }

    .box-main-card__text {
        font-weight: 500;
        font-size: 15px;
        color: var(--color-text);
    }

    .box-main-card__label {
        font-weight: 500;
        font-size: 15px;
        color: var(--color-text-light);
        margin-right: 13px;
    }
</style>