<template>
    <main>
        <div class="divide-y divide-muted">
            <div class="flex flex-col  space-y-4 mt-5">
                <div class="flex justify-between items-center space-y-4 mt-5">
                    <div class="text-xl font-bold text-accent-foreground self-center">Paroles</div>
                    <ScanPlexButton />

                </div>
                <div class="w-full max
                -w-xl flex border rounded overflow-hidden mb-2">
                    <input placeholder="Recherchez une musique..." class="p-2 flex-grow text-black" id="search-input"
                        @keydown.enter="findLyrics" v-model="lyricsQuery" list="lyrics-list">
                    <datalist id="lyrics-list">
                        <option v-for="song in lyricsResults" :value="song.name + ' - ' + song.artists"></option>
                    </datalist>
                </div>

                <!-- Afficher le titre, l'artiste et la pochette de l'album -->
                <div class="flex flex-row px-4 mt-5" id="song-infos" v-if="playing.title">
                    <img :src="playing.thumb ?? 'https://via.placeholder.com/150'" alt="Pochette de l'album"
                        id="song-cover" class="rounded-lg w-20 h-20 align-middle">
                    <div class="flex flex-col  ml-5  mt-0 pt-0">
                        <h3 class="text-lg font-bold text-accent-foreground" id="song-title">{{ playing.title }}</h3>
                        <h4 class="text-base font-bold text-accent-foreground" id="song-artist">{{ playing.artist }}
                        </h4>
                        <!-- Album -->
                        <h5 class="text-xs  text-accent-foreground" id="song-album">{{ playing.album }}</h5>
                    </div>
                </div>

                <h3 v-else class="text-lg text-accent-foreground ">Aucune musique en cours de lecture</h3>


                <div class="w-full max-w-xl space-y-2 mt-4 px-4" id="lyrics" v-html="lyrics">


                </div>
            </div>
            <div class="fixed inset-0 flex items-center justify-center" id="searching-spin" style="display: none;">
                <div class="animate-spin w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full"></div>
            </div>

            <!-- Texte pour dire si les lyrics ont été fetch sur génius ou sur le serveur -->
            <div class="flex flex-col items-center space-y-4 mt-5" id="lyrics-source" style="display: none;">
                <p class="text-xs text-accent-foreground" id="lyrics-source-text"></p>
            </div>

        </div>
    </main>
</template>

<script setup>

import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import ScanPlexButton from '@/components/buttons/ScanPlexButton.vue';

const musicStore = useMusicStore();

const { playing, lyrics, lyricsQuery, lyricsResults } = storeToRefs(musicStore);

const searchLyrics = async () => {
    await musicStore.searchLyrics(lyricsQuery.value);
}

const findLyrics = async () => {
    await musicStore.findLyrics(lyricsQuery.value);
}

musicStore.getPlaying();
musicStore.getPlayingLyrics();

// on mount, search lyrics
searchLyrics();

</script>