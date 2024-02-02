<script setup>
import { RouterLink } from 'vue-router';
const courses = [
  {
    name: 'Droit des successions',
    slug: 'Droit-des-successions',
  },
  {
    name: 'Droit du mariage et du divorce',
    slug: 'Droit-du-mariage-et-du-divorce',
  },
  {
    name: 'Droits réels',
    slug: 'Droits-reels',
  },
  {
    name: 'Droit des assurances sociales',
    slug: 'Droit-des-assurances-sociales',
  },
  {
    name: 'Droit des contrats spéciaux',
    slug: 'Droit-des-contrats-speciaux',
  },
];
</script>

<template>
  <div>
    <h1>Le droit suisse</h1>
    <p>Iuranovi est une plate-forme qui offre des cours de droit en ligne.</p>
    <p>
      Nous ciblons principalement les étudiant·e·s universitaires même si tout
      le monde peut consulter nos contenus.
    </p>
    <p>Pour le moment, les cours ci-dessous sont disponibles en français.</p>

    <ul id="courses-list">
      <li v-for="(course, index) in courses" :key="index">
        <RouterLink :to="`/course/${course.slug}`">
          {{ course.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#courses-list {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
#courses-list li {
  background-color: var(--c-orange-soft);
  color: var(--color-text);
  padding: 8px;
  margin: 10px auto;
  max-width: 400px;
  width: 95%;
}
</style>
