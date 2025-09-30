<template>
  <button class="button" :type="type" @click="clickHandler">
    <span class="button__text">{{ text }}</span>
    <slot name="icon"></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
      text?: String,
      type: 'button' | 'submit' | 'reset'
    }>(),
    {
      type: 'button'
    }
);

const emit = defineEmits<{
  (e: 'click'): void
}>();

const clickHandler = () => {
  emit('click');
};
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid #000;
  cursor: pointer;
  background-color: #fff;
  width: auto;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}

</style>
