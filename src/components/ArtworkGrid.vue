<script setup lang="ts">
import type { Artwork } from "../types";
defineProps<{ artworks: Artwork[] }>();
const emit = defineEmits<{ open: [artwork: Artwork] }>();
</script>
<template>
  <div class="art-grid">
    <button
      v-for="art in artworks"
      :key="art.id"
      class="art-item"
      @click="emit('open', art)"
    >
      <img :src="art.thumbnail" :alt="art.alt" loading="lazy" /><span
        class="art-caption"
        ><strong>{{ art.title }}</strong
        ><small>{{ art.technique }} · {{ art.year }}</small></span
      >
    </button>
  </div>
</template>
<style scoped>
.art-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.2rem, 3vw, 3rem);
}
.art-item {
  appearance: none;
  border: 0;
  background: transparent;
  text-align: left;
  color: var(--ink);
  padding: 0;
}
.art-item img {
  width: 100%;
  aspect-ratio: 1/1.15;
  object-fit: contain;
  background: var(--paper);
  padding: 0.5rem;
  box-shadow: 0 8px 20px rgba(57, 47, 35, 0.12);
  transition: transform 0.25s;
}
.art-item:hover img,
.art-item:focus-visible img {
  transform: translateY(-5px) rotate(-1deg);
}
.art-caption {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.7rem;
}
.art-caption small {
  color: var(--muted);
}
@media (max-width: 720px) {
  .art-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .art-caption {
    display: block;
  }
  .art-caption small {
    display: block;
    margin-top: 0.25rem;
  }
}
@media (max-width: 430px) {
  .art-grid {
    grid-template-columns: 1fr;
  }
}
</style>
