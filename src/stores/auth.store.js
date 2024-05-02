import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

import router from '@/router';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    async login(username, password) {
      this.user = await fetchWrapper.post(`${baseUrl}/login`, {
        login: username,
        password: password,
      });
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      router.push("/login");
    },
    verifyToken() {
      this.user = fetchWrapper.get(`${baseUrl}/verifyToken`);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAuthenticated: (state) => !!state.user,
  },
});
