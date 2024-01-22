<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import ChapterDocument from '../components/ChapterDocument.vue';

const route = useRoute();

const url = ref(null);

watchEffect(() => {
  const path = `${route.params.course}/${route.params.chapter}`;
  url.value = `https://app.lexdocta.com/api/courses/${path}`;
});

const { data, error } = useFetch(url);

watchEffect(async () => {
  const content = data.value?.content;
  if (content === undefined) {
    return;
  }
  await nextTick();
  const tabs = document.querySelectorAll('.tab > header');
  for (let i = 0; i < tabs.length; ++i) {
    tabs[i].addEventListener('click', handleTab);
  }
  const articles = document.querySelectorAll('[data-art]');
  for (let i = 0; i < articles.length; ++i) {
    articles[i].addEventListener('click', handleArt);
  }
});

function handleArt() {
  const articleId = +this.dataset.art;
  console.log(articleId);
}

function handleTab() {
  const div = this.nextSibling;
  const v = div.style.display === 'block' ? 'none' : 'block';
  div.style.display = v;
}
</script>

<template>
  <div class="chapter">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      <ChapterDocument :name="data.name" :content="data.content" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style>
@media (min-width: 960px) {
}
</style>
