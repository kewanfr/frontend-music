<template>
    {{ console.log(music.tracks) }}

    <div class="w-full max-w-xl space-y-2 mt-4" id="results-list">
        <ArtistItem v-if="music.artists?.length > 0" v-for="artist in music.artists" :key="artist.id"
            :artist="artist" />

        <TrackItem v-if="music.tracks?.length > 0" v-for="track in music.tracks" :key="track.id" :track="track" />
    </div>

</template>

<script setup>
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ArtistItem from './ArtistItem.vue';
import TrackItem from './TrackItem.vue';


const musicStore = useMusicStore();

const { music } = storeToRefs(musicStore);



</script>