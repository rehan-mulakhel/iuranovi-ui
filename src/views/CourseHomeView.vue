<script setup>
import { inject, nextTick, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { data, error } = inject('course');
const tableOfContent = ref('');

watchEffect(() => {
  const chapters = data?.value?.chapters || [];
  let previousX = -1;
  let acc = '';
  for (let i = 0; i < chapters.length; ++i) {
    const chapter = chapters[i];
    let delta = previousX - chapter.position_x;
    previousX = chapter.position_x;
    if (delta === -1) {
      acc += '<ol><li>';
    } else if (delta === 0) {
      acc += '</li><li>';
    } else {
      const closingTags = '</li></ol></li>'.repeat(delta);
      acc += `${closingTags}<li>`;
    }
    if (chapter.slug) {
      const url = `${data.value.card.slug}/${chapter.slug}`;
      acc += `<a href="${url}">${chapter.name}</a>`;
    } else {
      acc += chapter.name;
    }
  }
  if (previousX >= 0) {
    const closingTags = '</li></ol></li>'.repeat(previousX);
    acc += `${closingTags}</ol>`;
  }
  tableOfContent.value = acc;
});

watch(
  tableOfContent,
  async () => {
    await nextTick();
    const links = document.querySelectorAll('.toc a');
    for (let i = 0; i < links.length; ++i) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        const index = this.href.indexOf('/', 10);
        router.push(this.href.substring(index));
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="course-home">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      <h1>{{ data.card.name }}</h1>
      <div v-html="data.description"></div>
      <h2>Table des matières</h2>
      <div class="toc" v-html="tableOfContent"></div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style>
.toc ol {
  font-weight: 700;
  list-style-type: upper-roman;
  padding-left: 16px;
}
.toc ol ol {
  font-weight: 400;
  list-style-type: upper-alpha;
}
.toc ol ol ol {
  list-style-type: decimal;
}
.toc ol ol ol ol {
  list-style-type: lower-roman;
}
.toc ol ol ol ol ol {
  list-style-type: lower-greek;
}
@media (min-width: 960px) {
}
</style>
