<template>
  <div class="input-container" :class="{'input-container_error': error}">
    <label :for="id" class="label">{{ label }}</label>
    <input
        :id="id"
        class="input"
        :type="inputTypeInternal"
        :value="modelValue"
        :placeholder="placeholder"
        @input="inputHandler"
        @blur="inputHandler"
    />

    <template v-if="inputType === 'password'">
      <svg class="icon" v-show="inputTypeInternal === 'password'" @click="inputTypeInternal = 'text'">
        <use xlink:href="#icon-eye-show"></use>
      </svg>
      <svg class="icon" v-show="inputTypeInternal === 'text'" @click="inputTypeInternal = 'password'">
        <use xlink:href="#icon-eye-hide"></use>
      </svg>
    </template>

    <span class="input-error" v-if="error">{{ errorMessage }}</span>
  </div>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = withDefaults(defineProps<{
      label?: string,
      id: string
      placeholder?: string
      modelValue: string | number | boolean | null
      inputType: 'text' | 'password'
      error?: boolean
      errorMessage?: string
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

const inputTypeInternal = ref(props.inputType);

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
  position: relative;

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid grey;
    border-radius: 5px;
  }
}
.input-container_error {
  input {
    border: 1px solid red;
  }
}
.input-error {
  white-space: nowrap;
  color: red;
  font-size: 0.5rem;
  position: absolute;
  bottom: -10px;
  left: 0;
}
.icon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 15px;
  height: 15px;
}

</style>
