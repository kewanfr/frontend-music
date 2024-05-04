import { createRouter, createWebHistory } from "vue-router/auto";

import { useAuthStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "bg-gray-300",
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page

  const authStore = useAuthStore();
  if (to.path == "/logout") {
    authStore.logout();
    return { path: "/login" };
  }

  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.user) {
    return {
      path: "/login",
      query: { returnUrl: to.href },
    };
  }
});

export default router;
