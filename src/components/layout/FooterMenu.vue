<template>
  <div
    class="py-2 flex  justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-xl m-auto border-top border-accent">
    <MenuElement v-for="item in menuItems" :key="item.path" :path="item.path" :text="item.text"
      :iconElement="item.iconElement" />

    <LoginButton />

  </div>
</template>

<script setup>
// import IconHome from '../icons/IconHome.vue';
// import IconEmpty from '../icons/IconEmpty.vue';
// import IconMusic from '../icons/IconMusic.vue';
// import { defineAsyncComponent } from 'vue';
import MenuElement from './MenuElement.vue';
// import IconGallery from '../icons/IconGallery.vue';
import { useAuthStore } from '@/stores';
import { defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import LoginButton from '../buttons/LoginButton.vue';

import { markRaw } from 'vue';

const IconHome = markRaw(defineAsyncComponent(() => import('../icons/IconHome.vue')));
const IconEmpty = markRaw(defineAsyncComponent(() => import('../icons/IconEmpty.vue')));
const IconMusic = markRaw(defineAsyncComponent(() => import('../icons/IconMusic.vue')));
const IconGallery = markRaw(defineAsyncComponent(() => import('../icons/IconGallery.vue')));

// list of menu items
const menuItems = ref([
  {
    path: "/",
    text: "Accueil",
    iconElement: IconHome
  },
  {
    path: "/lyrics",
    text: "Paroles",
    iconElement: IconMusic
  },
  {
    path: "/queue",
    text: "File d'attente",
    iconElement: IconGallery
  }
]);

// const store = useAuthStore();

// const { isAuthenticated } = storeToRefs(store);
// console.log(isAuthenticated);

// if (isAuthenticated.value) {
//   menuItems.value.push({
//     path: "/logout",
//     text: "Déconnexion",
//     iconElement: IconEmpty
//   });

// } else {
//   menuItems.value.push({
//     path: "/login",
//     text: "Connexion",
//     iconElement: IconEmpty
//   });
// }

</script>
