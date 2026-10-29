<script setup lang="ts">
import { computed, ref } from "vue";
import ArtworkGrid from "../components/ArtworkGrid.vue";
import { artworks } from "../content/artworks";
import type { Artwork } from "../types";
const selected = ref<Artwork | null>(null);
const filter = ref("Todas");
const filters = computed(() => [
  "Todas",
  ...new Set(artworks.map((a) => a.technique || "Sin técnica")),
]);
const visible = computed(() =>
  filter.value === "Todas"
    ? artworks
    : artworks.filter((a) => a.technique === filter.value),
);
function close() {
  selected.value = null;
}
</script>
<template>
  <section class="page-shell view">
    <div class="section-heading">
      <div>
        <h1>Gallery</h1>
      </div>
      <div class="filters" aria-label="Filtrar por técnica">
        <button
          v-for="item in filters"
          :key="item"
          :class="{ active: filter === item }"
          @click="filter = item"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <ArtworkGrid :artworks="visible" @open="selected = $event" />
    <div
      v-if="selected"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="selected.title"
      @click.self="close"
    >
      <button class="close" aria-label="Cerrar imagen" @click="close">×</button>
      <figure>
        <img :src="selected.image" :alt="selected.alt" />
        <figcaption>
          <strong>{{ selected.title }}</strong> · {{ selected.year }} ·
          {{ selected.technique }}<br /><span>{{ selected.description }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
<style scoped>
.view {
  padding-top: 4rem;
  min-height: 70vh;
}
.filters {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}
.filters button {
  border: 0;
  border-bottom: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  padding: 0.4rem;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}
.filters button.active {
  color: var(--accent-orange);
  border-color: var(--accent-red);
}
.filters button:hover,
.filters button:focus-visible {
  color: var(--accent-yellow);
}
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 20;
  background: rgba(32, 30, 26, 0.86);
  display: grid;
  place-items: center;
  padding: 2rem;
}
.lightbox figure {
  margin: 0;
  max-width: min(850px, 92vw);
  max-height: 90vh;
  color: var(--paper);
}
.lightbox img {
  display: block;
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  background: var(--paper);
}
.lightbox figcaption {
  padding-top: 0.8rem;
  line-height: 1.5;
}
.close {
  position: absolute;
  right: 1.2rem;
  top: 0.8rem;
  border: 0;
  background: transparent;
  color: white;
  font-size: 2.4rem;
}
</style>
