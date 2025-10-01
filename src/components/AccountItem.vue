<template>
  <div class="account-item">
    <Input
        inputType="text"
        :id="`account-label-${account.id}`"
        label="Метка"
        placeholder="Введите метку"
        :modelValue="labelText"
        @update:model-value="labelText = $event"
        :error="v$.label.$error"
        :error-message="v$.label.$errors[0]?.$message"
    />

    <Select
        :id="`account-type-${account.id}`"
        :options="options"
        label="Тип записи"
        placeholder="Выберите тип"
        :modelValue="account.type"
        @update:modelValue="setAccountType"
        @blur="v$.type.$touch"
        option-label-key="text"
        :error="v$.type.$error"
        :error-message="v$.type.$errors[0]?.$message"
    />

    <Input
        inputType="text"
        :id="`account-login-${account.id}`"
        label="Логин"
        placeholder="Введите логин"
        :modelValue="account.login"
        @update:modelValue="updateInputHandler('login', $event)"
        :error="v$.login.$error"
        :error-message="v$.login.$errors[0]?.$message"
    />

    <Input
        v-show="account.type === 'Local'"
        :id="`account-password-${account.id}`"
        inputType="password"
        label="Пароль"
        placeholder="Введите пароль"
        :modelValue="account.password"
        @update:modelValue="updateInputHandler('password', $event)"
        :error="v$.password.$error"
        :error-message="v$.password.$errors[0]?.$message"
    />

    <Button
        type="button"
        text="Удалить"
        @click="deleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch} from "vue";
import {Account, AccountType} from "../types/account";
import Input from "./Input.vue";
import Select from "./Select.vue";
import Button from "./Button.vue";
import { useAccountStore} from "../store/accountStore";
import {useVuelidate} from "@vuelidate/core";
import { required, helpers, maxLength } from '@vuelidate/validators';

const accountStore = useAccountStore();

const props = defineProps<{
  account: Account
}>();

const account = ref({
  ...props.account
});

const labelText = computed({
  get() {
    return account.value.label.map(item => item.text).join(';');
  },
  set(value: string) {
    account.value.label = value
        .split(';')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => ({ text: item }));
  }
});

watch(account, (value) => {
  if (!v$.value.$invalid) {
    accountStore.updateAccount(value);
  }
}, { deep: true });

const updateInputHandler = (key: string, value: string) => {
  v$.value[key].$touch();
  account.value[key] = value;
};

const setAccountType = (value: { value: AccountType ; text: string}) => {
  account.value.type = value.value;
  if (value.value === 'Local') {
    account.value.password = null;
  }
};

const options = [
  {
    text: 'LDAP',
    value: 'LDAP'
  },
  {
    text: 'Local',
    value: 'Local'
  }
];

const deleteAccount = () => {
  accountStore.removeAccount(account.value.id)
};

const v$ = useVuelidate({
  type: {
    required: helpers.withMessage('Поле обязательно для заполнения', required),
  },
  label: {
    required: helpers.withMessage('Поле обязательно для заполнения', required),
    maxLength: helpers.withMessage('Максимальная длина 50 символов', maxLength(50)),
  },
  login: {
    required: helpers.withMessage('Поле обязательно для заполнения', required),
  },
  password: {
    requiredIf: (account.value.type === 'Local'),
    required: helpers.withMessage('Поле обязательно для заполнения', required),
    maxLength: helpers.withMessage('Максимальная длина 100 символов', maxLength(100)),
  }
}, account);

</script>

<style scoped>
.account-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: start;
  gap: 20px;
}

</style>
