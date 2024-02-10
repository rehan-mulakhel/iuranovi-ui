<script setup>
import { ref, watchEffect, provide } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import CourseNavigation from '../components/CourseNavigation.vue';
import LoaderBar from '../components/LoaderBar.vue';

const route = useRoute();
const url = ref(null);
const { data, error } = useFetch(url);
provide('course', { data, error });

watchEffect(() => {
  const slug = route.params.course;
  url.value = `https://app.lexdocta.com/api/courses/${slug}`;
});
</script>

<template>
  <div class="course">
    <template v-if="error">Oops! Error encountered }}</template>
    <template v-else-if="data">
      <CourseNavigation
        :slug="data.card.slug"
        :course="data.card.name"
        :chapters="data.chapters"
      />
    </template>
    <template v-else>
      <LoaderBar />
    </template>
    <RouterView />
  </div>
</template>

<style>
.env-info header,
.env-question header,
.env-warn header {
  color: var(--c-white-soft);
  font-weight: 700;
  padding: 0 4px;
}
.env-info p,
.env-question p,
.env-warn p {
  padding: 0 4px;
}

.env-info {
  background-color: var(--color-info-body);
}
.env-info header {
  background-color: var(--color-info-head);
}

.env-question {
  background-color: var(--color-question-body);
}
.env-question header {
  background-color: var(--color-question-head);
}

.env-warn {
  background-color: var(--color-warn-body);
}
.env-warn header {
  background-color: var(--color-warn-head);
}

.tabs-container {
  border: 1px solid var(--color-tab-border);
  margin: 10px 0;
}
.tabs-container header,
.tab > div {
  padding: 0 10px;
}
.tab header {
  background-color: var(--color-tab-header);
  border: 1px solid var(--color-tab-border);
  cursor: pointer;
  font-weight: 700;
}
.tab > div {
  display: none;
}
.course figure {
  text-align: center;
}

.course img {
  max-width: 100%;
}

.course a {
  border-bottom: 1px solid var(--color-text-link);
  color: var(--color-text-link);
  text-decoration: none;
}

mark {
  background-color: var(--color-text-mark);
}

header [data-art] {
  color: var(--color-art-head);
}

[data-art] {
  color: var(--color-art);
  cursor: pointer;
  font-weight: 700;
}
</style>
