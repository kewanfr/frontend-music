<template>
    <button v-if="!downloading.includes(spotify_id)"
        class="text-blue-500 border border-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white stroke-blue-500 hover:stroke-white"
        @click="downloadTrack">
        <DownloadIcon />
    </button>
    <LoadingIcon v-else />
</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import DownloadIcon from '../icons/DownloadIcon.vue';
import LoadingIcon from '../icons/LoadingIcon.vue';

const musicStore = useMusicStore();

const { downloading } = storeToRefs(musicStore);

const props = defineProps({
    spotify_id: String
});

const downloadTrack = () => {
    musicStore.downloadTrack(props.spotify_id);
}
</script>

<style scoped>
button svg {
    stroke: #3b82f6;
}

button:hover svg {
    stroke: white;
}
</style>