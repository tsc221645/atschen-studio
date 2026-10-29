<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Notebook } from "../types";
defineProps<{ notebook: Notebook }>();
</script>
<template>
  <article class="notebook-card">
    <RouterLink class="notebook-link" :to="`/library/${notebook.slug}`"
      ><div class="cover">
        <img
          :src="notebook.coverImage"
          :alt="notebook.coverAlt"
          loading="lazy"
        /><span class="cover-mark">{{ notebook.year }}</span>
      </div>
      <div class="card-meta">
        <h2>{{ notebook.title }}</h2>
        <p>{{ notebook.description }}</p>
        <small>{{ notebook.pages.length }} páginas · abrir cuaderno →</small>
      </div></RouterLink
    >
  </article>
</template>
<style scoped>
.notebook-card {
  display: grid;
}
.notebook-link {
  text-decoration: none;
  display: grid;
  gap: 1.1rem;
}
.cover {
  position: relative;
  transition: transform 0.4s cubic-bezier(0.2, 0.75, 0.25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.cover img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  box-shadow: var(--shadow);
}
.cover-mark {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #1d1e20;
  font: 700 0.85rem var(--display-font);
  background: var(--accent-yellow);
  padding: 0.3rem;
}
.notebook-link:hover .cover,
.notebook-link:focus-visible .cover {
  transform: rotate(-1.2deg) translateY(-5px);
}
.card-meta h2 {
  font: 700 1.8rem var(--display-font);
  letter-spacing: -0.04em;
  margin: 0;
}
.card-meta p {
  line-height: 1.55;
  color: var(--muted);
  margin: 0.5rem 0;
}
.card-meta small {
  color: var(--accent-yellow);
}
</style>
