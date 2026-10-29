<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import BookViewer from "../components/BookViewer.vue";
import { notebooks } from "../content/notebooks";
const route = useRoute();
const notebook = computed(() =>
  notebooks.find((n) => n.slug === route.params.slug),
);
</script>
<template>
  <section class="page-shell view" v-if="notebook">
    <RouterLink class="text-link back" to="/library"
      >← Volver a la biblioteca</RouterLink
    >
    <div class="notebook-intro">
      <div>
        <p class="eyebrow">Cuaderno {{ notebook.year }}</p>
        <h1 class="serif">{{ notebook.title }}</h1>
      </div>
      <p>{{ notebook.description }}</p>
    </div>
    <BookViewer :notebook="notebook" />
  </section>
  <section v-else class="page-shell view">
    <p class="eyebrow">Cuaderno no encontrado</p>
    <h1 class="serif">Esta página se perdió entre hojas.</h1>
    <RouterLink class="button" to="/library">Volver a la biblioteca</RouterLink>
  </section>
</template>
<style scoped>
.view {
  padding-top: 2.5rem;
  min-height: 70vh;
}
.back {
  display: inline-block;
  margin-bottom: 2rem;
}
.notebook-intro {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 2rem;
  margin-bottom: 2rem;
}
.notebook-intro h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  margin: 0.4rem 0;
}
.notebook-intro p {
  max-width: 350px;
  line-height: 1.55;
  color: var(--muted);
}
@media (max-width: 650px) {
  .notebook-intro {
    display: block;
  }
}
</style>
