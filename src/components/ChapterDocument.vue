<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

import { ref, watchEffect, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '../fetch.js';
import ModalArticle from '../components/ModalArticle.vue';

window.MathJax.typesetClear();
window.MathJax.typesetPromise()
  .then(() => {
    window.MathJax.typesetPromise();
  })
  .catch((err) => console.log(err.message));

const articleUrl = ref(null);
const showModal = ref(false);
const router = useRouter();
const { data: articleData } = useFetch(articleUrl);

watchEffect(async () => {
  const content = props.content;
  if (content === undefined) {
    return;
  }
  await nextTick();
  const tabs = document.querySelectorAll('.tab > header');
  for (let i = 0; i < tabs.length; ++i) {
    tabs[i].addEventListener('click', handleTab);
  }
  const links = document.querySelectorAll('.chapter-doc a');
  for (let i = 0; i < links.length; ++i) {
    links[i].addEventListener('click', handleLink);
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

function handleLink(e) {
  // handle internal link
  if (this.href.startsWith(location.origin)) {
    e.preventDefault();
    const index = this.href.indexOf('/', 10);
    router.push(this.href.substring(index));
  }
}

function handleTab() {
  const div = this.nextSibling;
  const v = div.style.display === 'block' ? 'none' : 'block';
  div.style.display = v;
}
</script>

<template>
  <h1>{{ props.name }}</h1>
  <div class="chapter-doc" v-html="props.content"></div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalArticle :show="showModal" @close="showModal = false">
      <template #header v-if="articleData">
        Art. <span v-html="articleData.name"></span>
      </template>
      <template #body v-if="articleData">
        <ul class="article-index">
          <li v-for="(item, index) in articleData.index" :key="index">
            {{ item }}
          </li>
        </ul>
        <div v-html="articleData.content"></div>
        <ol
          class="article-footnotes"
          v-if="articleData.note || articleData.footnotes"
        >
          <li v-if="articleData.note" v-html="articleData.note"></li>
          <li
            v-for="(note, index) in articleData.footnotes"
            :key="index"
            v-html="note"
          ></li>
        </ol>
      </template>
    </ModalArticle>
  </Teleport>
</template>

<style scoped>
.article-index,
.article-footnotes {
  font-size: 0.9em;
}
.article-footnotes {
  border-top: 1px solid var(--color-border);
  padding-left: 32px;
  padding-top: 16px;
}
@media (min-width: 960px) {
}
</style>
