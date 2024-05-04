<template>
    <div class="flex items-center space-x-2 border-b pb-2 pt-2 cursor-pointer" @click="clickArtist">
        <CoverImage :src="artist.image_url" :alt="artist.name" type="artist" />

        <div class="flex-grow">
            <h3 class="font-semibold">{{ artist.name }}</h3>
        </div>
        <ChevronRight />
    </div>
</template>

<script setup>
import ChevronRight from '../icons/ChevronRight.vue';
import { useMusicStore } from '@/stores';
import CoverImage from './CoverImage.vue';


const props = defineProps({
    artist: Object
});

const musicStore = useMusicStore();

// on click, set the selected artist
const clickArtist = () => {
    musicStore.getArtist(props.artist.spotify_id);
    // router.push({ query: { artist: props.artist.spotify_id } });
}

</script>