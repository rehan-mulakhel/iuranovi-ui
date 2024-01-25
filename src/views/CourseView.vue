<script setup>
import { ref, watchEffect, provide } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useFetch } from '../fetch.js';
import CourseNavigation from '../components/CourseNavigation.vue';

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
    <template v-else>Loading...</template>
    <RouterView />
  </div>
</template>

<style>
.env-info header,
.env-question header,
.env-warn header {
  color: #fff;
  font-weight: 700;
  padding: 0 4px;
}
.env-info p,
.env-question p,
.env-warn p {
  padding: 0 4px;
}

.env-info {
  background-color: #ddf;
}
.env-info header {
  background-color: #008;
}

.env-question {
  background-color: #c9eba0;
}
.env-question header {
  background-color: #168a35;
}

.env-warn {
  background-color: #fdd;
}
.env-warn header {
  background-color: #800;
}

.tabs-container {
  border: 1px solid black;
  margin: 10px 0;
}
.tabs-container header,
.tab > div {
  padding: 0 10px;
}
.tab header {
  background-color: #ddd;
  border: 1px solid black;
  cursor: pointer;
  font-weight: 700;
}
.tab > div {
  display: none;
}
.course figure {
  text-align: center;
}

.course a {
  border-bottom: 1px solid blue;
  color: #00f;
  text-decoration: none;
}

mark {
  background-color: #eee389;
}

header [data-art] {
  color: #ffbe6f;
}

[data-art] {
  color: #8c720c;
  cursor: pointer;
  font-weight: 700;
}

@media (min-width: 960px) {
}
</style>
