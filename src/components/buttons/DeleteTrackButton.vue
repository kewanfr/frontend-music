<template>
    <LoadingIcon v-if="downloading.includes(spotify_id)" />
    <button v-else-if="!queue.find(track => track.spotify_id === spotify_id)" class="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white stroke-red-500
         hover:stroke-white" @click="deleteTrack">
        <DeleteIcon />
    </button>
</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import DeleteIcon from '../icons/DeleteIcon.vue';
import LoadingIcon from '../icons/LoadingIcon.vue';

const musicStore = useMusicStore();

const { downloading, queue } = storeToRefs(musicStore);

const props = defineProps({
    spotify_id: String,
});

const deleteTrack = () => {
    try {
        musicStore.deleteTrack(props.spotify_id);
    } catch (error) {
        console.error(error);
    }
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