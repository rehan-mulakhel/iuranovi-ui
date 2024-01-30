<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header id="header">
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100%" />
    </RouterLink>
  </header>

  <div id="main">
    <RouterView />
  </div>

  <footer id="footer">
    <ul>
      <li>
        <RouterLink to="/about">À propos de</RouterLink>
      </li>
      <li>Publicité</li>
      <li>CGU</li>
    </ul>
    <p>&#169; Iuranovi 2024</p>
  </footer>
</template>

<style scoped></style>
