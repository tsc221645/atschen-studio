<script setup lang="ts">
import { site } from "../content/site";
</script>
<template>
  <section class="page-shell prose-view">
    <p class="eyebrow">El estudio</p>
    <h1 class="serif">About</h1>
    <p class="statement">{{ site.bio }}</p>
    <div class="rule"></div>
    <p>
      Este sitio es una biblioteca viva: algunas páginas están terminadas, otras
      conservan la marca del lápiz y la duda. El contenido demo puede
      reemplazarse desde los archivos tipados de <code>src/content/</code>.
    </p>
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
  font-weight: 400;
  margin: 0.5rem 0 3rem;
}
.statement {
  font:
    clamp(1.7rem, 4vw, 3.2rem) / 1.25 Georgia,
    serif;
}
.prose-view p:last-child {
  max-width: 550px;
  line-height: 1.7;
  color: var(--muted);
}
.rule {
  border-top: 1px solid var(--line);
  margin: 3rem 0;
}
code {
  color: var(--moss);
}
</style>
