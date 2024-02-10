<script setup></script>

<template>
  <div class="loader-spinner"></div>
</template>

<style scoped>
.loader-spinner {
  border: 16px solid var(--c-grey-soft);
  border-radius: 50%;
  border-top: 16px solid var(--c-grey-dark);
  max-width: 320px;
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  margin: 16px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
