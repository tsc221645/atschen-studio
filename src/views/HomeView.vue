<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { site } from "../content/site";
import { artworks } from "../content/artworks";
import { notebooks } from "../content/notebooks";
import { assetUrl } from "../utils/assetUrl";

const activeArtworkIndex = ref(0);
const activeArtwork = computed(() => artworks[activeArtworkIndex.value]);
const autoplayEnabled = ref(true);
const pointerInside = ref(false);
const focusInside = ref(false);
const carouselPaused = computed(
  () => !autoplayEnabled.value || pointerInside.value || focusInside.value,
);
const recentNotebooks = [...notebooks]
  .filter((book) => book.status === "published")
  .sort((a, b) => b.year - a.year)
  .slice(0, 3);

function moveArtwork(direction: number) {
  activeArtworkIndex.value =
    (activeArtworkIndex.value + direction + artworks.length) % artworks.length;
}

let autoplayTimer: ReturnType<typeof setInterval> | undefined;
let motionPreference: MediaQueryList | undefined;

function updateMotionPreference(event: MediaQueryListEvent) {
  if (event.matches) autoplayEnabled.value = false;
}

function onCarouselFocusOut(event: FocusEvent) {
  const container = event.currentTarget;
  const nextTarget = event.relatedTarget as Node | null;
  if (container instanceof HTMLElement && !container.contains(nextTarget)) {
    focusInside.value = false;
  }
}

function toggleAutoplay() {
  autoplayEnabled.value = !autoplayEnabled.value;
  if (autoplayEnabled.value) {
    pointerInside.value = false;
    focusInside.value = false;
  }
}

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionPreference.matches) autoplayEnabled.value = false;
  motionPreference.addEventListener("change", updateMotionPreference);
  if (artworks.length > 1) {
    autoplayTimer = setInterval(() => {
      if (!carouselPaused.value && !document.hidden) moveArtwork(1);
    }, 5000);
  }
});

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  motionPreference?.removeEventListener("change", updateMotionPreference);
});
</script>
<template>
  <div class="home">
    <section class="hero page-shell">
      <div>
        <h1 class="serif">{{ site.tagline }}</h1>
        <p class="lead">{{ site.intro }}</p>
        <div class="actions">
          <RouterLink class="button button-primary" to="/gallery"
            >Ver mis obras <span aria-hidden="true">↗</span></RouterLink
          ><RouterLink class="button" to="/library"
            >Explorar sketchbooks</RouterLink
          >
        </div>
      </div>
      <div class="hero-art paper-panel">
        <img :src="artworks[0].image" :alt="artworks[0].alt" />
      </div>
    </section>
    <section class="page-shell home-section">
      <div class="section-heading artwork-heading">
        <h2 class="serif">Recent artwork</h2>
        <RouterLink class="button" to="/gallery"
          >Ver toda la galería
          <img
            class="button-icon"
            :src="assetUrl('assets/open_icon.png')"
            alt=""
            aria-hidden="true"
          />
        </RouterLink>
      </div>
      <div
        v-if="activeArtwork"
        class="artwork-carousel"
        aria-roledescription="carrusel"
        aria-label="Obras de arte"
        @mouseenter="pointerInside = true"
        @mouseleave="pointerInside = false"
        @focusin="focusInside = true"
        @focusout="onCarouselFocusOut"
      >
        <Transition name="artwork-slide" mode="out-in">
          <article :key="activeArtwork.id" class="featured-artwork">
            <RouterLink
              class="featured-artwork__image"
              to="/gallery"
              :aria-label="`Ver ${activeArtwork.title} en la galería`"
            >
              <img :src="activeArtwork.image" :alt="activeArtwork.alt" />
              <span class="image-link">
                Ver en galería
                <img
                  :src="assetUrl('assets/open_icon.png')"
                  alt=""
                  aria-hidden="true"
                />
              </span>
            </RouterLink>
            <div class="featured-artwork__details">
              <div>
                <p class="eyebrow">
                  {{ activeArtwork.technique }} · {{ activeArtwork.year }}
                </p>
                <h3>{{ activeArtwork.title }}</h3>
                <p v-if="activeArtwork.description" class="muted">
                  {{ activeArtwork.description }}
                </p>
              </div>
              <RouterLink
                class="text-link"
                to="/gallery"
                :aria-label="`Ver ${activeArtwork.title} en la galería`"
              >
                Ver dibujo
                <img
                  class="button-icon"
                  :src="assetUrl('assets/open_icon.png')"
                  alt=""
                  aria-hidden="true"
                />
              </RouterLink>
            </div>
          </article>
        </Transition>
        <div class="carousel-controls">
          <button
            class="carousel-arrow"
            type="button"
            aria-label="Obra anterior"
            @click="moveArtwork(-1)"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div class="carousel-dots" aria-label="Elegir obra">
            <button
              v-for="(artwork, index) in artworks"
              :key="artwork.id"
              class="carousel-dot"
              :class="{ active: index === activeArtworkIndex }"
              type="button"
              :aria-label="`Ver obra ${index + 1}: ${artwork.title}`"
              :aria-current="index === activeArtworkIndex ? 'true' : undefined"
              @click="activeArtworkIndex = index"
            />
          </div>
          <span class="carousel-count"
            >{{ String(activeArtworkIndex + 1).padStart(2, "0") }} /
            {{ String(artworks.length).padStart(2, "0") }}</span
          >
          <button
            class="carousel-toggle"
            type="button"
            :aria-label="carouselPaused ? 'Reanudar carrusel' : 'Pausar carrusel'"
            :aria-pressed="carouselPaused"
            @click="toggleAutoplay"
          >
            {{ carouselPaused ? "Reanudar" : "Pausar" }}
          </button>
          <button
            class="carousel-arrow"
            type="button"
            aria-label="Obra siguiente"
            @click="moveArtwork(1)"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
    <section class="page-shell home-section">
      <div class="section-heading sketchbooks-heading">
        <div>
          <h2 class="serif">Sketchbooks</h2>
        </div>
        <RouterLink class="button" to="/library"
          >Ver todos
          <img
            class="button-icon"
            :src="assetUrl('assets/open_icon.png')"
            alt=""
            aria-hidden="true"
          />
        </RouterLink>
      </div>
      <div class="mini-books">
        <RouterLink
          v-for="book in recentNotebooks"
          :key="book.id"
          :to="`/library/${book.slug}`"
          class="mini-book"
        >
          <div class="mini-book__cover">
            <img :src="book.coverImage" :alt="book.coverAlt" loading="lazy" />
            <span class="mini-book__year">{{ book.year }}</span>
          </div>
          <span class="mini-book__title">{{ book.title }}</span>
          <span class="mini-book__link"
            >Abrir sketchbook
            <img
              :src="assetUrl('assets/open_icon.png')"
              alt=""
              aria-hidden="true"
            />
          </span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(2rem, 8vw, 7rem);
  align-items: center;
  padding-top: clamp(4rem, 10vw, 8rem);
}
h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.96;
  font-weight: 700;
  letter-spacing: -0.065em;
  max-width: 760px;
  margin: 1rem 0;
}
.lead {
  font: 1.25rem/1.55 var(--display-font);
  max-width: 450px;
  color: var(--muted);
}
.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.hero-art {
  padding: 1rem;
  transform: rotate(2deg);
  transition:
    transform 0.45s cubic-bezier(0.2, 0.75, 0.25, 1),
    box-shadow 0.45s ease;
}
.hero-art:hover {
  transform: rotate(0) translateY(-4px);
  box-shadow: 0 24px 55px rgba(0, 0, 0, 0.4);
}
.hero-art img {
  display: block;
  width: 100%;
  aspect-ratio: 1/1.15;
  object-fit: contain;
}
.home-section {
  margin-top: clamp(5rem, 12vw, 10rem);
  max-width: 1080px;
}
.home-section :deep(.section-heading) {
  margin-bottom: 1.5rem;
}
.home-section :deep(.sketchbooks-heading h2) {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 650;
  letter-spacing: -0.05em;
}
.home-section :deep(.button-icon) {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
  margin-left: 0.4rem;
}
.home-section :deep(.artwork-heading) {
  align-items: center;
}
.artwork-carousel {
  width: min(100%, 820px);
  margin: 0 auto;
}
.featured-artwork {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
}
.featured-artwork__image {
  min-width: 0;
  width: min(100%, 720px);
  height: clamp(280px, 52vw, 520px);
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--art-paper);
  text-decoration: none;
}
.featured-artwork__image img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.55s cubic-bezier(0.2, 0.75, 0.25, 1);
}
.image-link {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0.65rem 0.85rem;
  border-radius: 999px;
  color: #1d1e20;
  background: var(--accent-yellow);
  font-size: 0.78rem;
  font-weight: 650;
  opacity: 0;
  transform: translateY(5px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.image-link img {
  width: 0.8rem;
  height: 0.8rem;
  object-fit: contain;
}
.featured-artwork__image:hover .image-link,
.featured-artwork__image:focus-visible .image-link {
  opacity: 1;
  transform: translateY(0);
}
.featured-artwork__details h3 {
  margin: 0.55rem 0;
  font-size: clamp(1.5rem, 3.5vw, 2.4rem);
  letter-spacing: -0.045em;
}
.featured-artwork__details {
  display: grid;
  justify-items: center;
  gap: 0.8rem;
  text-align: center;
}
.featured-artwork__details p:not(.eyebrow) {
  max-width: 560px;
  line-height: 1.65;
  margin: 0 auto;
}
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.6rem;
}
.carousel-arrow {
  width: 2.6rem;
  height: 2.6rem;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  background: var(--paper-deep);
  font-size: 1.1rem;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}
.carousel-arrow:hover,
.carousel-arrow:focus-visible {
  color: var(--accent-yellow);
  border-color: var(--accent-orange);
  transform: scale(1.06);
}
.carousel-dots {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--muted);
  opacity: 0.45;
  transition:
    width 0.25s ease,
    opacity 0.25s ease,
    background-color 0.25s ease;
}
.carousel-dot.active {
  width: 1.35rem;
  border-radius: 999px;
  background: var(--accent-orange);
  opacity: 1;
}
.carousel-count {
  color: var(--muted);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}
.carousel-toggle {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 0.45rem;
  font-size: 0.75rem;
  transition: color 0.25s ease;
}
.carousel-toggle:hover,
.carousel-toggle:focus-visible {
  color: var(--accent-yellow);
}
.artwork-slide-enter-active,
.artwork-slide-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.4s cubic-bezier(0.2, 0.75, 0.25, 1);
}
.artwork-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.artwork-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.mini-books {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: clamp(1rem, 3vw, 2rem);
}
.mini-book {
  min-width: 0;
  display: grid;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--ink);
}
.mini-book__cover {
  position: relative;
  width: 100%;
  aspect-ratio: 0.82;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--paper-deep);
  box-shadow: var(--shadow);
  transition:
    transform 0.4s cubic-bezier(0.2, 0.75, 0.25, 1),
    box-shadow 0.4s ease;
}
.mini-book__cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.2, 0.75, 0.25, 1);
}
.mini-book__year {
  position: absolute;
  right: 0.65rem;
  bottom: 0.65rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: var(--accent-yellow);
  color: #1d1e20;
  font-size: 0.7rem;
  font-weight: 700;
}
.mini-book__title {
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  font-weight: 650;
  letter-spacing: -0.02em;
}
.mini-book__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-orange);
  font-size: 0.8rem;
  transition: color 0.25s ease;
}
.mini-book__link img {
  width: 0.75rem;
  height: 0.75rem;
  object-fit: contain;
}
.mini-book:hover .mini-book__cover,
.mini-book:focus-visible .mini-book__cover {
  transform: translateY(-5px);
  box-shadow: 0 24px 55px rgba(0, 0, 0, 0.4);
}
.mini-book:hover .mini-book__cover img,
.mini-book:focus-visible .mini-book__cover img {
  transform: scale(1.035);
}
.mini-book:hover .mini-book__link,
.mini-book:focus-visible .mini-book__link {
  color: var(--accent-yellow);
}
@media (max-width: 720px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-art {
    max-width: 430px;
  }
  .featured-artwork__image {
    height: clamp(250px, 70vw, 420px);
  }
  .mini-books {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (prefers-reduced-motion: reduce) {
  .artwork-slide-enter-active,
  .artwork-slide-leave-active {
    transition: none;
  }
}
@media (max-width: 430px) {
  .mini-books {
    grid-template-columns: 1fr;
  }
}
</style>
