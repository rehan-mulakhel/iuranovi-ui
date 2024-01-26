<script setup>
import { inject, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import ChapterDocument from '../components/ChapterDocument.vue';
import ChapterPrevNext from '../components/ChapterPrevNext.vue';

const route = useRoute();

const chapterSlug = ref(null);
const chapterUrl = ref(null);

watchEffect(() => {
  const path = `${route.params.course}/${route.params.chapter}`;
  chapterUrl.value = `https://app.lexdocta.com/api/courses/${path}`;
  chapterSlug.value = route.params.chapter;
});

const { data: course } = inject('course');
const { data: chapter, error } = useFetch(chapterUrl);

function process(content) {
  const url = `https://app.lexdocta.com/api/courses/${route.params.course}/`;
  return content.replaceAll('src="', `src="${url}`);
}
</script>

<template>
  <div class="chapter">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="course && chapter">
      <ChapterDocument
        :name="chapter.name"
        :content="process(chapter.content)"
      />
      <ChapterPrevNext :chapters="course.chapters" :current="chapterSlug" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style>
@media (min-width: 960px) {
}
</style>
