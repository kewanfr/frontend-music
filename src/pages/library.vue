<template>
    <main>
        <div class="flex justify-between items-center space-y-4 mt-5">
            <div class="text-xl font-bold">Sons téléchargés</div>
            <ScanPlexButton />
        </div>
        <SearchBar :searchAction="search" :searchButton="true" :searchOnInput="true" />

        <div class="divide-y divide-muted">
            <div class="flex flex-col items-center space-y-4 mt-5">

                <div class="w-full max-w-xl space-y-2 mt-4" id="results-list" v-if="tracks?.length > 0">

                    <TrackItem v-for="track in filteredTracks" :key="track.id" :track="track" />
                </div>

                <LoadingSpin :isLoading="isLoading" />

                <div id="toasts" class="fixed bottom-0 right-0 p-4 z-20">
                </div>

            </div>
        </div>
    </main>
</template>

<script setup>
import LoadingSpin from '@/components/LoadingSpin.vue';
import ScanPlexButton from '@/components/buttons/ScanPlexButton.vue';

import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import TrackItem from '@/components/music/TrackItem.vue';
import SearchBar from '@/components/SearchBar.vue';
import { onMounted, ref, watch } from 'vue';

const musicStore = useMusicStore();

const searchQuery = ref('');
const { tracks, isLoading } = storeToRefs(musicStore);

const filteredTracks = ref([]);

setTimeout(() => {
    if (!tracks.length || tracks.length == 0) {
        musicStore.sendWebSocket("tracks");
    }
}, 800);

// On tracks change

watch(tracks, () => {
    const query = searchQuery.value;
    if (query === '') {
        filteredTracks.value = tracks.value;
        return;
    }
    filteredTracks.value = tracks.value.filter(track => {
        return track.name.toLowerCase()?.includes(query.toLowerCase()) || track.artists.toLowerCase().includes(query.toLowerCase()) || track.album_name.toLowerCase().includes(query.toLowerCase());
    });
});


const search = (query) => {

    if (query === '') {
        filteredTracks.value = tracks.value;
        return;
    }

    searchQuery.value = query;
    filteredTracks.value = tracks.value.filter(track => {
        return track.name.toLowerCase()?.includes(query.toLowerCase()) || track.artists.toLowerCase().includes(query.toLowerCase()) || track.album_name.toLowerCase().includes(query.toLowerCase());
    });
}

</script>