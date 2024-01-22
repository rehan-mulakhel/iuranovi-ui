<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header id="header">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <RouterLink to="/">Iuranovi</RouterLink>
      <RouterLink to="/about">À propos de</RouterLink>
    </div>
  </header>

  <RouterView />

  <footer id="footer">Tous droits réservés</footer>
</template>

<style scoped>
@media (min-width: 960px) {
}
</style>
