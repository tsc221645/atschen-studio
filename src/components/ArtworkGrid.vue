<script setup lang="ts">
import type { Artwork } from "../types";
import { assetUrl } from "../utils/assetUrl";
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
      <span class="art-image">
        <img :src="art.thumbnail" :alt="art.alt" loading="lazy" />
        <span class="art-open" aria-hidden="true">
          <img :src="assetUrl('assets/open_icon.png')" alt="" />
        </span>
      </span>
      <span
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
.art-image {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1/1.15;
  background: var(--art-paper);
  padding: 0.5rem;
  box-shadow: 0 8px 20px rgba(57, 47, 35, 0.12);
  transition:
    transform 0.4s cubic-bezier(0.2, 0.75, 0.25, 1),
    box-shadow 0.4s ease;
}
.art-image > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.art-open {
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(29, 30, 32, 0.88);
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.art-open img {
  width: 0.85rem;
  height: 0.85rem;
  object-fit: contain;
}
.art-item:hover .art-image,
.art-item:focus-visible .art-image {
  transform: translateY(-5px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24);
}
.art-item:hover .art-open,
.art-item:focus-visible .art-open {
  opacity: 1;
  transform: translateY(0);
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
