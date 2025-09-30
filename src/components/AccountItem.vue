<template>
  <div class="account-item">
    <Input
        id="account-label"
        label="Метка"
        placeholder="Введите метку"
        @update:model-value="updateLabel"
    />

    <Select
        id="type"
        :options="options"
        label="Тип записи"
        placeholder="Выберите тип"
        v-model="account.type"
        option-label-key="text"
    />

    <Input
        inputType="text"
        id="account-login"
        label="Логин"
        placeholder="Введите логин"
        v-model="account.login"
    />

    <Input
        id="pasword"
        inputType="password"
        label="Пароль"
        placeholder="Введите пароль"
        v-model="account.password"
    />

    <Button
        type="button"
        text="Удалить"
        @click="deleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Account, AccountType} from "../types/account";
import Input from "./Input.vue";
import Select from "./Select.vue";
import Button from "./Button.vue";
import { useAccountStore} from "../store/accountStore";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const accountStore = useAccountStore();

const props = defineProps<{
  account: Account
}>();

const account = ref({
  ...props.account
});

const updateLabel = (value: string) => {

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
    required
  },
  login: {
    required
  },
  password: {
    required
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
