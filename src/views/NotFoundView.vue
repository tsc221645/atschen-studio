<template>
  <section class="page-shell not-found">
    <p class="eyebrow">404</p>
    <h1 class="serif">No hay dibujo en esta página.</h1>
    <RouterLink class="button" to="/">Volver al inicio</RouterLink>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped>
.not-found {
  padding-top: 8rem;
  min-height: 65vh;
}
.not-found h1 {
  font: clamp(2.5rem, 7vw, 5rem) var(--display-font);
  font-weight: 700;
  letter-spacing: -0.06em;
  max-width: 700px;
}
</style>
