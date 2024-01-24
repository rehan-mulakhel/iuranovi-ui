<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import ChapterDocument from '../components/ChapterDocument.vue';
import Modal from '../components/Modal.vue';

const route = useRoute();

const chapterUrl = ref(null);
const articleUrl = ref(null);
const showModal = ref(false);

watchEffect(() => {
  const path = `${route.params.course}/${route.params.chapter}`;
  chapterUrl.value = `https://app.lexdocta.com/api/courses/${path}`;
});

const { data: chapterData, error: chapterError } = useFetch(chapterUrl);
const { data: articleData, error: articleError } = useFetch(articleUrl);

watchEffect(async () => {
  const content = chapterData.value?.content;
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

async function handleArt() {
  const id = +this.dataset.art;
  articleUrl.value = `https://app.lexdocta.com/api/articles/id?aid=${id}&lang=fr`;
  showModal.value = true;
}

function handleTab() {
  const div = this.nextSibling;
  const v = div.style.display === 'block' ? 'none' : 'block';
  div.style.display = v;
}
</script>

<template>
  <div class="chapter">
    <div v-if="chapterError">
      Oops! Error encountered: {{ chapterError.message }}
    </div>
    <div v-else-if="chapterData">
      <ChapterDocument
        :name="chapterData.name"
        :content="chapterData.content"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal :show="showModal" @close="showModal = false">
      <template #header v-if="articleData">
        Art. {{ articleData.name }}
      </template>
      <template #body v-if="articleData">
        <ul class="article-index">
          <li v-for="(item, index) in articleData.index" :key="index">
            {{ item }}
          </li>
        </ul>
        <div v-html="articleData.content"></div>
      </template>
    </Modal>
  </Teleport>
</template>

<style>
.article-index {
  font-size: 0.9em;
}
@media (min-width: 960px) {
}
</style>
