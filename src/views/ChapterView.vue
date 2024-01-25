<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import ChapterDocument from '../components/ChapterDocument.vue';

const route = useRoute();

const chapterUrl = ref(null);

watchEffect(() => {
  const path = `${route.params.course}/${route.params.chapter}`;
  chapterUrl.value = `https://app.lexdocta.com/api/courses/${path}`;
});

const { data, error } = useFetch(chapterUrl);

function process(content) {
  const url = `https://app.lexdocta.com/api/courses/${route.params.course}/`;
  return content.replaceAll('src="', `src="${url}`);
}
</script>

<template>
  <div class="chapter">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      <ChapterDocument :name="data.name" :content="process(data.content)" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style>
@media (min-width: 960px) {
}
</style>
