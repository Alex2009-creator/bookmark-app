<script setup lang="ts"></script>

<template>
    <button
        type="button"
        class="box-main-card-container__btn"
    >
        <span class="box-main-card-container__text">Начать</span>
        <img
            src="../assets/btn-start.png"
            alt="Начать"
            class="box-main-card-container__img"
        />                    
    </button>
</template>

<style scoped>
    .box-main-card-container__btn {
        min-width: 110px;
        min-height: 40px;
        border-radius: 16px;
        padding: 0;
        background-color: var(--background-bg);
        color: var(--background-card);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-main-card-container__btn:hover {
        cursor: pointer;
    }

    .box-main-card-container__text {
        font-weight: 500;
        font-size: 15px;
        margin: 0 5px;
    }

    .box-main-card-container__img {
        width: 13px;
        height: 13px;
        margin: 0 5px;
    }
</style>