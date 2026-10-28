<script setup lang="ts">
import { site } from "../content/site";
</script>
<template>
  <section class="page-shell prose-view">
    <p class="eyebrow">Una conversación</p>
    <h1 class="serif">Contact</h1>
    <p class="statement">
      Para encargos, colaboraciones o simplemente compartir una observación:
    </p>
    <a class="email" :href="`mailto:${site.email}`">{{ site.email }}</a>
    <div class="socials">
      <a
        v-for="social in site.socials"
        :key="social.label"
        :href="social.href"
        target="_blank"
        rel="noreferrer"
        >{{ social.label }} ↗</a
      >
    </div>
  </section>
</template>
<style scoped>
.prose-view {
  padding-top: 5rem;
  min-height: 65vh;
}
.prose-view h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 400;
  margin: 0.5rem 0 3rem;
}
.statement {
  font:
    clamp(1.5rem, 3vw, 2.5rem) / 1.3 Georgia,
    serif;
  max-width: 650px;
}
.email {
  display: inline-block;
  font:
    clamp(1.5rem, 4vw, 3rem) Georgia,
    serif;
  color: var(--moss);
  margin: 2rem 0;
}
.socials {
  display: flex;
  gap: 1.5rem;
}
.socials a {
  color: var(--muted);
}
</style>
