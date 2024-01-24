<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

MathJax.typesetClear();
MathJax.typesetPromise()
  .then(() => {
    MathJax.typesetPromise();
  })
  .catch((err) => console.log(err.message));
</script>

<template>
  <div class="chapter-doc" v-html="props.content"></div>
</template>

<style scoped>
@media (min-width: 960px) {
}
</style>
