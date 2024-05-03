import { createRouter, createWebHistory } from "vue-router/auto";
// import DownloadView from "../views/DownloadView.vue";

import { useAuthStore } from "@/stores";
// import LoginView from "@/views/LoginView.vue";
// import QueueView from "@/views/QueueView.vue";
// import LibraryView from "@/views/LibraryView.vue";
// import LyricsView from "@/views/LyricsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "bg-gray-300",
  // routes: [
  //   { path: "/", component: DownloadView },
  //   { path: "/login", component: LoginView },
  //   { path: "/logout", component: LoginView },
  //   { path: "/queue", component: QueueView },
  //   { path: "/lyrics", component: LyricsView },
  //   { path: "/library", component: LibraryView },

  //   // otherwise redirect to home
  //   { path: "/:pathMatch(.*)*", redirect: "/" },
  // ],
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
