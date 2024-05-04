<template>
  <main>
    <div class="flex flex-col items-center space-y-4 mt-5">File d'attente</div>
    <div class="divide-y divide-muted">
      <div class="flex flex-col items-center space-y-4 mt-5">

        <div class="w-full max-w-xl space-y-2 mt-4" id="results-list">

          <TrackItem v-if="queue?.length > 0" v-for="track in queue" :key="track.id" :track="track" />
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

import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import TrackItem from '@/components/music/TrackItem.vue';

const musicStore = useMusicStore();

const { queue, isLoading } = storeToRefs(musicStore);

setTimeout(() => {
  if (!queue.length || queue.length == 0) {
    musicStore.sendWebSocket("queue", "test");
  }
}, 800);

</script>