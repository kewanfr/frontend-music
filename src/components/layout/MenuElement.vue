<template>
    <RouterLink class="inline-flex
    active
     items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
     disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 focus-visible:ring-gray-500 focus-visible:ring-opacity-50
     h-9 px-4 py-2  flex-1" :to="path">
        <span class="relative inline-block flex">
            <component :is="iconElement"></component>

            {{ text }}
        </span>
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