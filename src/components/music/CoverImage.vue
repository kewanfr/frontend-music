<template>
    <img :src="src" :alt="alt" width="48" height="48" :class="classNames" loading="lazy" decoding="async">
</template>

<script setup>
const props = defineProps({
    src: String,
    alt: String,
    type: String
});

// class for rounded corners
const roundedClass = props.type == "artist" ? "rounded-full" : "rounded-md";
const classNames = "w-12 h-12 " + roundedClass;

</script>