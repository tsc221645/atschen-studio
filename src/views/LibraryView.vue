<script setup lang="ts">
import NotebookCard from "../components/NotebookCard.vue";
import { notebooks } from "../content/notebooks";
const published = [...notebooks]
  .filter((n) => n.status === "published")
  .sort((a, b) => b.year - a.year);
</script>
<template>
  <section class="page-shell view">
    <div class="section-heading">
      <div>
        <h1>Sketchbooks</h1>
      </div>
      <p class="intro">En esta sección puedes visualizar algunos de mis sketchbooks.</p>
    </div>
    <div class="notebook-grid">
      <NotebookCard v-for="book in published" :key="book.id" :notebook="book" />
    </div>
  </section>
</template>
<style scoped>
.view {
  padding-top: 4rem;
  min-height: 70vh;
}
.intro {
  max-width: 280px;
  line-height: 1.5;
  color: var(--muted);
}
.notebook-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.5rem, 4vw, 3.5rem);
  max-width: 1120px;
  margin: auto;
}
@media (max-width: 850px) {
  .notebook-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 650px) {
  .notebook-grid {
    grid-template-columns: 1fr;
  }
}
</style>
