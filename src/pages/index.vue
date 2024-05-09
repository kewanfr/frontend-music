<template>
  <main>
    <div class="flex flex-col items-center space-y-4 mt-5">Télécharger</div>
    <div class="divide-y divide-muted">
      <div class="flex flex-col items-center space-y-4 mt-5">

        <SearchBar :searchAction="search" :searchButton="true" />
        <ResultsList />

        <LoadingSpin :isLoading="isLoading" />

        <div id="toasts" class="fixed bottom-0 right-0 p-4 z-20">
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import LoadingSpin from '@/components/LoadingSpin.vue';
import ResultsList from '@/components/music/ResultsList.vue';

import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import SearchBar from '../components/SearchBar.vue';

const musicStore = useMusicStore();

const { isLoading } = storeToRefs(musicStore);

const search = async (query) => {
  await musicStore.search(query);
}

</script>