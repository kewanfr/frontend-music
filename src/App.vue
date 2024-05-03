<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderTitle from './components/layout/HeaderTitle.vue'
import FooterMenu from './components/layout/FooterMenu.vue';
import { useMusicStore } from '@/stores';
import { onMounted } from 'vue';

// import { socket } from '@/socket';

const musicStore = useMusicStore();

// socket.off();

onMounted(() => {
  musicStore.connectWebSocket();
})
</script>

<template class="dark">
  <div class="flex flex-col h-full">

    <HeaderTitle />

    <RouterView class="flex-1 max-w-xl m-auto pb-14 w-full" />

    <FooterMenu />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
