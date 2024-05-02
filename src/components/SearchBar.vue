<template>
    <div class="w-full max-w-xl flex border rounded overflow-hidden mb-2">
        <input placeholder="Recherchez une musique..." class="p-2 flex-grow text-black" type="text" id="search-input"
            v-model="query" @keydown.enter="search" />
        <button class="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-400" id="search-button" @click="search">
            <SearchIcon />
        </button>
    </div>

</template>

<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { useMusicStore } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const musicStore = useMusicStore();
const router = useRouter();
const route = useRoute();

const query = ref(route.query.q || '');


const search = async () => {
    router.push({ query: { q: query.value } });
    await musicStore.search(query.value);
}

onMounted(() => {
    if (route.query.q) {
        search();
    }
})

</script>