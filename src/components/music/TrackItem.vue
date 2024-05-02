<template @click="clickArtist">
    <div class="flex items-center space-x-2 border-b pb-2 pt-2">
        <CoverImage :src="track.cover_url" :alt="track.name" type="track" />
        {{ console.log(track) }}
        <div class="flex-grow">
            <h3 class="font-semibold">{{ track.name }}</h3>
            <p class="text-gray-400">{{ track.artist }}</p>
        </div>
        <DownloadTrackButton :spotify_id="track.spotify_id" />
    </div>
</template>

<script setup>
import DownloadTrackButton from '../buttons/DownloadTrackButton.vue';
import CoverImage from './CoverImage.vue';

const props = defineProps({
    track: Object
});

</script>
