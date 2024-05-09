<template>
    <div class="w-full max-w-xl flex border rounded overflow-hidden mb-2">
        <input placeholder="Recherchez une musique..." class="p-2 flex-grow text-black" type="text" id="search-input"
            @keydown.enter="search" @input="inputSearch" v-model="query" />
        <button class="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-400" id="search-button" @click="search"
            v-if="searchButton">
            <SearchIcon />
        </button>
    </div>

</template>

<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    searchAction: Function,
    searchButton: Boolean,
    searchOnInput: Boolean
});
const router = useRouter();
const route = useRoute();

const query = ref(route.query.q || '');

const search = () => {
    router.push({ query: { q: query.value } });
    props.searchAction(query.value);
}

const inputSearch = () => {
    if (props.searchOnInput) {
        search();
    }
}

onMounted(() => {
    if (route.query.q) {
        search();
    }
})


</script>