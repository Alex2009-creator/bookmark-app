import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  // --- Состояние (State) ---
  const activeTitle = ref<string>('')
  const activeDescription = ref<string>('') // <- Добавили новое поле
  const activeDuration = ref<number>(0)

  // --- Действия (Actions) ---
  // Обновляем функцию, чтобы она принимала и записывала описание
  function startSession(title: string, description: string, durationMin: number) {
    activeTitle.value = title
    activeDescription.value = description // <- Записываем описание
    activeDuration.value = durationMin
  }

  return {
    activeTitle,
    activeDescription, // <- Не забываем вернуть его для использования в компонентах
    activeDuration,
    startSession,
  }
})
