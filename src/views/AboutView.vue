<script setup lang="ts">
import { site } from "../content/site";
</script>
<template>
  <section class="page-shell prose-view">
    <h1 class="serif">About</h1>
    <p class="statement">{{ site.bio }}</p>
  </section>
</template>
<style scoped>
.prose-view {
  padding-top: 5rem;
  max-width: 800px;
  min-height: 65vh;
}
.prose-view h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  margin: 0.5rem 0 3rem;
}
.statement {
  font: clamp(1.7rem, 4vw, 3.2rem) / 1.25 var(--display-font);
  font-weight: 550;
  letter-spacing: -0.04em;
}
</style>
