<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  chapters: {
    type: Array,
    required: true,
  },
});

import { ref, watch, toRaw } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const currentChapter = ref(null);
const breadcrumbItems = ref([]);

watch(
  () => route.params.chapter,
  (slug) => {
    const items = [];
    const chapters = structuredClone(toRaw(props.chapters));
    const index = chapters.findIndex((c) => c.slug === slug);
    if (index === -1) {
      breadcrumbItems.value = [];
      currentChapter.value = null;
      return;
    }
    currentChapter.value = chapters[index];
    let positionX = chapters[index].position_x;
    for (let i = index; i >= 0 || positionX === 0; --i) {
      const item = chapters[i];
      if (item.slug === null && item.position_x < positionX) {
        positionX = item.poisiton_x;
        items.push(item.name);
      }
    }
    items.reverse();
    breadcrumbItems.value = items;
  },
  { immediate: true }
);
</script>

<template>
  <div class="course-nav">
    <nav>
      <ul class="course-breadcrumb">
        <li>
          <RouterLink :to="`/course/${props.slug}`">
            {{ props.course }}
          </RouterLink>
        </li>
        <li v-for="(item, index) in breadcrumbItems" :key="index">
          {{ item }}
        </li>
        <li>
          <b>{{ currentChapter?.name || 'Description' }}</b>
        </li>
      </ul>
    </nav>
    <aside>
      <ul class="chapters-nav">
        <template v-for="(chapter, index) in props.chapters" :key="index">
          <RouterLink
            v-if="chapter.slug"
            :to="`/course/${props.slug}/${chapter.slug}`"
            :active="chapter.slug === currentChapter?.slug"
            :title="chapter.name"
          >
            <li></li>
          </RouterLink>
        </template>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.course-breadcrumb {
  border-bottom: 1px solid #ccc;
  list-style: none;
  overflow: hidden;
  padding: 10px 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-breadcrumb li {
  display: inline;
  font-size: 0.9em;
}

.course-breadcrumb li + li:before {
  padding: 8px;
  color: #000;
  content: '/ ';
}

.chapters-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  gap: 4px;
  width: 100%;
}

.chapters-nav a {
  background-color: #fff;
  border: 1px solid #000;
  flex: 1 1 0px;
  height: 20px;
}

.chapters-nav .router-link-active {
  background-color: var(--color-text);
}

@media (min-width: 960px) {
}
</style>
