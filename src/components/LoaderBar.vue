<script setup></script>

<template>
  <div class="loader-bar"></div>
</template>

<style scoped>
.loader-bar {
  width: 100%;
  height: 16px;
  background:
    linear-gradient(90deg, var(--c-black-dark) 50%, #0000 0) 0 0,
    linear-gradient(-90deg, var(--c-black-dark) 50%, #0000 0) 0 0;
  background-size: 20px 100%;
  background-repeat: repeat-x;
  animation: l10 1s infinite linear;
}
@keyframes l10 {
  100% {
    background-position:
      -20px 0,
      20px 0;
  }
}
</style>
