<script setup>
const props = defineProps({
  chapters: {
    type: Array,
    required: true,
  },
  current: {
    type: String,
    required: true,
  },
});

import { ref, watchEffect, toRaw } from 'vue';
import { RouterLink } from 'vue-router';

const prevSlug = ref(null);
const nextSlug = ref(null);

watchEffect(() => {
  const chapters = structuredClone(toRaw(props.chapters));
  const index = chapters.findIndex((c) => c.slug === props.current);
  if (index === -1) {
    prevSlug.value = null;
    nextSlug.value = null;
    return;
  }
  for (let i = index - 1; i >= 0; --i) {
    const chapter = chapters[i];
    if (chapter.slug) {
      prevSlug.value = chapter.slug;
      break;
    }
  }
  for (let i = index + 1; i < chapters.length; ++i) {
    const chapter = chapters[i];
    if (chapter.slug) {
      nextSlug.value = chapter.slug;
      break;
    }
  }
});
</script>

<template>
  <aside class="prev-next">
    <RouterLink v-if="prevSlug" :to="prevSlug">
      <div>Précédent</div>
    </RouterLink>
    <RouterLink v-if="nextSlug" :to="nextSlug">
      <div>Suivant</div>
    </RouterLink>
  </aside>
</template>

<style scoped>
.prev-next {
  display: flex;
  justify-content: center;
}
.prev-next a {
  border: none;
}
.prev-next div {
  background-color: var(--c-orange-soft);
  color: var(--color-text);
  margin: 8px;
  padding: 8px;
}
</style>
