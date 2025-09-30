import {defineStore} from "pinia";
import type {Account} from "../types/account";

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accounts: [] as Account[]
    }
  },
  getters: {
    getAccounts: (state) => state.accounts
  },
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
    }
  },
});
