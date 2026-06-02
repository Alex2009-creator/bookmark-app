<template>
  <div class="base-input-container">
    <!-- Выводим лейбл, если он передан -->
    <input
      v-model="model"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ 'has-error': error }"
      class="base-input-field"      
    />

    <!-- Выводим сообщение об ошибке, если оно есть -->
    <span v-if="error" class="base-input-error-msg">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
    // Отключаем автоматическое наследование атрибутов корневым элементом (div),
    // чтобы они уходили напрямую на тег <input> (например, autocomplete,maxlength)
    defineOptions({
        inheritAttrs: false
    })

    // Настройка пропсов
    defineProps({    
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    // Двусторонняя связь v-model (доступно начиная с Vue 3.4+)
    const model = defineModel({ type: String, default: '' })
</script>

<style scoped>
.base-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
}

.base-input-field {
    font-family: Alegreya Sans;    
    font-size: 18px;
    width: 305px;
    padding: 10px 12px;
    color: var(--color-text-light);
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--color-text-primary);  
    outline: none;
    transition: border-color 0.2s;
}

.base-input-field:focus {
  border-color: var(--color-text-secondary); /* Фирменный цвет Vue */
}

.base-input-field.has-error {
  border-color: #e74c3c;
}

.base-input-error-msg {
  margin-top: 4px;
  font-size: 12px;
  color: #e74c3c;
}
</style>
