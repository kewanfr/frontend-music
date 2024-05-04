<template>
  <div
    class="py-2 flex  justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-xl m-auto border-top border-accent bg-white">
    <MenuElement v-for="item in menuItems" :key="item.path" :path="item.path" :text="item.text"
      :iconElement="item.iconElement" />

    <QueueNavButton />

  </div>
</template>

<script setup>
import MenuElement from './MenuElement.vue';
import { defineAsyncComponent, ref } from 'vue';
import QueueNavButton from '../buttons/QueueNavButton.vue';

import { markRaw } from 'vue';

const IconHome = markRaw(defineAsyncComponent(() => import('../icons/IconHome.vue')));
const IconMusic = markRaw(defineAsyncComponent(() => import('../icons/IconMusic.vue')));
const IconArchive = markRaw(defineAsyncComponent(() => import('../icons/IconArchive.vue')));

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
    path: "/library",
    text: "Bibliothèque",
    iconElement: IconArchive
  }
]);

</script>
