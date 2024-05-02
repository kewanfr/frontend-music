//stores/users.js
import { defineStore } from 'pinia'

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
  }),
  actions: {
    async getAll() {
      console.log(baseUrl)
      // console.log(import.meta.env)
      // console.log(process.env)
      this.users = { loading: true };
      fetchWrapper
        .get(baseUrl)
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }));
    },
  },
});
