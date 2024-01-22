<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="chapter-doc" v-html="props.content"></div>
</template>

<style scoped>
@media (min-width: 960px) {
}
</style>
