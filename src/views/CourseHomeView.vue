<script setup>
import { inject } from 'vue';
import { RouterLink } from 'vue-router';

const { data, error } = inject('course');
</script>

<template>
  <div class="course-home">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      <h1>{{ data.card.name }}</h1>
      <div v-html="data.description"></div>
    </div>
    <div v-else>Loading...</div>
    <ol>
      <li>
        <RouterLink to="/course/foo/bar"> Intro </RouterLink>
      </li>
      <li>Results</li>
      <li>Conclusion</li>
    </ol>
  </div>
</template>

<style>
@media (min-width: 960px) {
}
</style>
