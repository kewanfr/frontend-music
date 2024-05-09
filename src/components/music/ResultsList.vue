<template>
    <div class="w-full max-w-xl space-y-2 mt-4" id="results-list">
        <ArtistItem v-if="results.artists?.length > 0" v-for="artist in results.artists" :key="artist.id"
            :artist="artist" />

        <TrackResultItem v-if="results.tracks?.length > 0" v-for="track in results.tracks" :key="track.id"
            :track="track" />
    </div>

</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import ArtistItem from './ArtistItem.vue';
import TrackResultItem from './TrackResultItem.vue';


const musicStore = useMusicStore();

const { results } = storeToRefs(musicStore);



</script>