<script setup>
import { RouterLink } from 'vue-router'
const courses = [
  {
    name: 'Droit des successions',
    slug: 'Droit-des-successions',
  },
  {
    name: 'Droit du mariage et du divorce',
    slug: 'Droit-du-mariage-et-du-divorce',
  },
];
</script>

<template>
  <main>
    <h1>Le droit suisse</h1>
    <p>Iuranovi est une plate-forme qui offre des cours de droit suisse en
    ligne.</p>
    <p>Nous ciblons principalement les étudiant·e·s universitaires mais tout le
    monde peut consulter nos contenus.</p>

    <ul>
      <li v-for="(course, index) in courses">
        <RouterLink to="/course/">
          {{ course.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
