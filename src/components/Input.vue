<template>
  <div class="input-container">
    <label :for="id" class="label">{{ label }}</label>
    <input
        :id="id"
        class="input"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        @input="inputHandler"
        @blur="inputHandler"
    />
  </div>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = withDefaults(defineProps<{
      label?: string,
      id: string
      placeholder?: string
      modelValue: string
      inputType: 'text' | 'password'
    }>(),
    {
      modelValue: '',
      inputType: 'text'
    }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
  internalValue.value = value
});

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
};

</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  width: 100%;

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid grey;
    border-radius: 5px;
  }
}

</style>
