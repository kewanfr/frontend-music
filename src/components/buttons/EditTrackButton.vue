<template>
    <LoadingIcon v-if="downloading.includes(spotify_id) || downloading.includes(youtube_id)" />
    <!-- class="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white stroke-red-500 hover:stroke-white" -->
    <!-- Edit Button color  -->
    <button
        v-else-if="!queue.find(track => track.spotify_id === spotify_id) && !queue.find(track => track.youtube_id === youtube_id)"
        class="text-slate-500 border border-slate-500 px-2 py-1 rounded hover:bg-slate-500 hover:text-white stroke-slate-500 hover:stroke-white"
        @click="editTrack">
        <EditIcon />
    </button>
</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import EditIcon from '../icons/EditIcon.vue';
import LoadingIcon from '../icons/LoadingIcon.vue';

const musicStore = useMusicStore();

const { downloading, queue } = storeToRefs(musicStore);

const props = defineProps({
    spotify_id: String,
    youtube_id: String,
});

const editTrack = () => {
    try {
        musicStore.editTrack(props.spotify_id ?? props.youtube_id ?? null);
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