<template>
  <div class="timer-relax">
    <div class="timer-relax__label">
      <!-- Выводим динамически форматированное время вместо статического 5:00 -->
      <p class="timer-relax__text">{{ formattedTime }}</p>
    </div>
    <!-- Выводим заголовок и описание из стора -->
    <div class="timer-relax__title">{{ timerStore.activeTitle || 'Медитация' }}</div>
    <p class="timer-relax__description">{{ timerStore.activeDescription }}</p>

    <div class="timer-relax-box">
      <!-- Кнопка Назад (возврат на главную) -->
      <button class="timer-relax-box__btn" @click="goBack">
        <img src="../assets/backspace.svg" class="timer-relax-box__img" />
      </button>

      <!-- Если таймер запущен, показываем кнопку СТОП (пауза) -->
      <button v-if="isRunning" class="timer-relax-box__btn" @click="stopTimer">
        <img src="../assets/stop.png" class="timer-relax-box__img" />
      </button>

      <!-- Если таймер на паузе, показываем кнопку PLAY (старт) -->
      <button v-else class="timer-relax-box__btn" @click="startTimer">
        <img src="../assets/play.png" class="timer-relax-box__img" />
      </button>

      <!-- Кнопка Сброс (перезапуск таймера заново) -->
      <button class="timer-relax-box__btn" @click="resetTimer">
        <img src="../assets/repeat.svg" class="timer-relax-box__img" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTimerStore } from '../stores/timer.store'

const router = useRouter()
const timerStore = useTimerStore()

// Время в секундах (по умолчанию берем минуты из стора и переводим в секунды)
const timeLeft = ref(timerStore.activeDuration * 60)
const isRunning = ref(false)
let intervalId: number | null = null

// Если пользователь зашел на страницу напрямую без выбора карточки — уводим на главную
onMounted(() => {
  if (timerStore.activeDuration === 0) {
    router.push('/')
    return
  }
  // Автоматический старт при входе на страницу
  startTimer()
})

// Форматирование секунд в читаемый вид ММ:СС
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

// Запуск таймера
function startTimer() {
  if (isRunning.value) return
  isRunning.value = true
  intervalId = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleTimerFinished()
    }
  }, 1000)
}

// Остановка (пауза) таймера
function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  isRunning.value = false
}

// Сброс таймера на исходное время карточки
function resetTimer() {
  stopTimer()
  timeLeft.value = timerStore.activeDuration * 60
  startTimer()
}

// Действие при завершении времени
function handleTimerFinished() {
  stopTimer()
  alert('Медитация успешно завершена!')
  router.push('/')
}

// Кнопка возврата
function goBack() {
  router.push('/')
}

// Очистка памяти при уходе со страницы
onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
/* Ваши стили остались полностью без изменений */
.timer-relax {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.timer-relax__label {
  width: 250px;
  height: 250px;
  margin-top: 60px;
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

.timer-relax__title {
  margin-top: 30px;
  font-size: 35px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.timer-relax__description {
  margin-top: 10px;
  font-size: 25px;
  color: var(--color-text-secondary);
}

.timer-relax-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.timer-relax-box__btn {
  margin-top: 20px;
  background-color: transparent;
  border: none;
}

.timer-relax-box__btn:hover {
  cursor: pointer;
}
</style>
