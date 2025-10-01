import {defineStore} from "pinia";
import type {Account} from "../types/account";

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accounts: [] as Account[]
    }
  },
  persist: true,
  getters: {
    getAccounts: (state) => state.accounts
  },
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
    },
    updateAccount(account: Account) {
      console.log(account, 'updateAccount')
      const index = this.accounts.findIndex((item) => item.id === account.id);
      if (index !== -1) {
        this.accounts[index] = account;
      }
    }
  },
});
