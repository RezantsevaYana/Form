<template>
  <div class="select-container" :class="{'select-container_error': error}" ref="selectRef">
    <label :for="id" class="label">{{ label }}</label>
    <input
        :id="id"
        type="text"
        :value="searchValue"
        @input="inputHandler"
        @click="clickHandler"
        @blur="blurHandler"
        :readonly="readonly"
    >
    <span class="input-error" v-if="error">{{ errorMessage }}</span>
    <div class="select-container__dropdown" :class="{'select-container__dropdown_open': isOpenDropdown}">
      <ul>
        <li v-for="option in filterOptions" @click="selectHandler(option)" :key="getOptionLabel(option)">
          {{ getOptionLabel(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";

type Option = Record<string, any>

const props = withDefaults(defineProps<{
  label?: string,
  id: string
  modelValue: string
  options: Option[],
  optionLabelKey?: string,
  readonly?: boolean,
  error?: boolean
  errorMessage?: string
}>(), {
  optionLabelKey: 'text'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option): void
  (e: 'blur'): void
}>();

const searchValue = ref(props.modelValue);

const filterOptions = computed(() => {
  return props.options.filter((option) => {
    return getOptionLabel(option).toLowerCase().includes(searchValue.value.toLowerCase())
  });
});

const inputHandler = (event: Event) => {
  searchValue.value = (event.target as HTMLInputElement).value
};

const isOpenDropdown = ref(false);
const clickHandler = (event: Event) => {
  isOpenDropdown.value = true;
};

const selectHandler = (option: Option) => {
  isOpenDropdown.value = false
  searchValue.value = getOptionLabel(option)
  emit('update:modelValue', option);
};

const blurHandler = () => {
  emit('blur');
};

const getOptionLabel = (option: Option) => {
  return option[props.optionLabelKey]
};

const selectRef = ref<HTMLElement | null>(null);
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!selectRef.value?.contains(event.target as Node)) {
      isOpenDropdown.value = false
    }
  })
});

onUnmounted(() => {
  document.removeEventListener('click', (event) => {
    if (!selectRef.value?.contains(event.target as Node)) {
      isOpenDropdown.value = false
    }
  })
});


</script>

<style scoped>
.select-container {
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
.select-container__dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  z-index: 1;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 5px;
  padding: 5px;
  margin-top: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  & ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  & li {
    width: 100%;
    padding: 5px;
    cursor: pointer;
  }
  & li:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
}
.select-container__dropdown_open {
  opacity: 1;
  visibility: visible;
}
.select-container_error {
  input {
    border: 1px solid red;
  }
}
.input-error {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  bottom: -20px;
  left: 0;
}

</style>
