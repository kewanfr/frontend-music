<script setup>
import LoginButton from '../buttons/LoginButton.vue';


</script>

<template>
  <header class="border-b border-b-accent  top-0 z-20 bg-background w-full">
    <div class="container flex items-center py-2 max-w-xl m-auto gap-1">
      <h2 class="text-2xl font-bold mr-auto">Music Downloader</h2>

      <div class="flex gap-1">
        <LoginButton />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
