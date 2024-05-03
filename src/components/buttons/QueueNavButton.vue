<template>
    <RouterLink class="inline-flex
    active
     items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
     disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 focus-visible:ring-gray-500 focus-visible:ring-opacity-50
     h-9 px-4 py-2" to="/queue">
        <IconGallery />

        File d'attente
        <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-grey
             bg-orange-600 rounded-full" v-if="queue.length > 0 || downloading.length > 0">
            {{ queue.length + downloading.length }}
        </span>

    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useMusicStore } from '@/stores';
import { storeToRefs } from 'pinia';
import IconGallery from '../icons/IconGallery.vue';

const props = defineProps({
    path: String,
    text: String,
    iconElement: Object
})

const musicStore = useMusicStore();

const { queue, downloading } = storeToRefs(musicStore);

</script>