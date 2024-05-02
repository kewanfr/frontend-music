<script setup>
const props = defineProps(['isLoading']);

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center" id="searching-spin" v-if="isLoading">
        <div class="animate-spin w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
</template>

<style>
.animate-spin {
    animation: spin 1s linear infinite;
}
</style>