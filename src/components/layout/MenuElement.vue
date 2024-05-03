<template>
    <RouterLink class="inline-flex
    active
     items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
     disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 focus-visible:ring-gray-500 focus-visible:ring-opacity-50
     h-9 px-4 py-2" :to="path">
        <!-- <span class="relative inline-block flex"> -->
        <component :is="iconElement"></component>

        {{ text }}
        <span v-if="path == '/queue'" class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-grey
             bg-orange-600
                 rounded-full">
            2
        </span>
        <!-- </span> -->
        <!-- <span class="sr-only">Notifications</span> -->

    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    path: String,
    text: String,
    iconElement: Object
})

</script>