<template>
    <button class="text-blue-500 border border-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white stroke-blue-500
         hover:stroke-white" @click="scanLibrary">
        <LoadingIcon v-if="loading" />
        <span v-else>Scan Plex</span>
    </button>
</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import LoadingIcon from '../icons/LoadingIcon.vue';
import { ref } from 'vue';

const musicStore = useMusicStore();

const { downloading, queue } = storeToRefs(musicStore);

const loading = ref(false);

const scanLibrary = () => {
    loading.value = true;
    musicStore.scanPlexLibrary();
    setTimeout(() => {
        loading.value = false;
    }, 5000);
};
</script>

<style scoped>
button svg {
    stroke: #3b82f6;
}

button:hover svg {
    stroke: white;
}
</style>