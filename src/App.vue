<template>
  <main class="main">
    <div class="title-container">
      <h1>Учетные записи</h1>
      <Button
          type="button"
          text="Добавить"
          @click="addAccountHandler"
      />
    </div>
    <div class="main-container">
      <div class="account-list">
        <AccountItem :account="account" v-for="account in accounts" :key="account.id"/>
      </div>

    </div>

  </main>
</template>

<script setup lang="ts">
import AccountItem from "./components/AccountItem.vue";
import { useAccountStore } from "./store/accountStore";
import {computed} from "vue";
import Button from "./components/Button.vue";
import { nanoid } from 'nanoid';

const accountStore = useAccountStore();

const accounts = computed(() => accountStore.getAccounts);

const addAccountHandler = () => {
  accountStore.addAccount({
    id: nanoid(),
    label: [],
    type: 'Local',
    login: '',
    password: ''
  })
}


</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 100vh;
}
.title-container {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}
.account-list {
  width: 100%;
}
</style>
