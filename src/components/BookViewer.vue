<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { Notebook, NotebookPage } from "../types";
import { useNotebookNavigation } from "../composables/useNotebookNavigation";
import { assetUrl } from "../utils/assetUrl";
import PageSheet from "./PageSheet.vue";

const props = defineProps<{ notebook: Notebook }>();
const nav = reactive(useNotebookNavigation(props.notebook));
const opened = ref(false);
const zoom = ref<NotebookPage | null>(null);

function move(direction: number) {
  nav.go(nav.mode === "book" ? direction * 2 : direction);
}

function key(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
  if (event.key === "Escape") {
    zoom.value = null;
    opened.value = false;
  }
}

onMounted(() => window.addEventListener("keydown", key));
onUnmounted(() => window.removeEventListener("keydown", key));
</script>

<template>
  <div class="book-viewer">
    <div v-if="!opened" class="book-stage">
      <button
        class="cover-shell"
        type="button"
        :aria-label="`Abrir ${notebook.title}`"
        @click="opened = true"
      >
        <img :src="notebook.coverImage" :alt="notebook.coverAlt" />
        <span class="open-label">
          Abrir cuaderno
          <img
            class="open-icon"
            :src="assetUrl('assets/open_icon.png')"
            alt=""
            aria-hidden="true"
          />
        </span>
      </button>
    </div>

    <template v-else>
      <div
        :key="`${nav.index}-${nav.mode}`"
        class="book-spread"
        :class="{ single: nav.mode === 'single' }"
        :aria-label="`Página ${nav.index + 1} de ${notebook.pages.length}`"
      >
        <PageSheet :page="notebook.pages[nav.index]" @zoom="zoom = $event" />
        <PageSheet
          v-if="nav.mode === 'book' && nav.index + 1 < notebook.pages.length"
          :page="notebook.pages[nav.index + 1]"
          @zoom="zoom = $event"
        />
      </div>

      <div class="book-controls">
        <div class="book-navigation" aria-label="Navegación de páginas">
          <button
            class="page-arrow"
            type="button"
            aria-label="Página anterior"
            :disabled="!nav.canPrevious"
            @click="move(-1)"
          >
            <span aria-hidden="true">←</span>
            <span class="control-label">Anterior</span>
          </button>
          <div class="page-status" aria-live="polite">
            <span class="page-status__number">
              {{
                nav.mode === "book"
                  ? `${nav.index + 1}–${Math.min(nav.index + 2, notebook.pages.length)}`
                  : nav.index + 1
              }}
            </span>
            <span class="page-status__total">/ {{ notebook.pages.length }}</span>
            <span class="page-status__label">{{
              nav.mode === "book" ? "páginas" : "página"
            }}</span>
          </div>
          <button
            class="page-arrow"
            type="button"
            aria-label="Página siguiente"
            :disabled="!nav.canNext"
            @click="move(1)"
          >
            <span class="control-label">Siguiente</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <input
          class="page-progress"
          type="range"
          min="0"
          :max="notebook.pages.length - 1"
          :value="nav.index"
          :aria-label="`Ir a una página de ${notebook.title}`"
          @input="nav.setIndex(Number(($event.target as HTMLInputElement).value))"
        />
        <div class="book-options">
          <button
            class="viewer-option"
            type="button"
            :aria-pressed="nav.mode === 'single'"
            @click="nav.mode = nav.mode === 'book' ? 'single' : 'book'"
          >
            <span aria-hidden="true">{{
              nav.mode === "book" ? "▯" : "▯▯"
            }}</span>
            {{ nav.mode === "book" ? "Vista individual" : "Vista libro" }}
          </button>
          <button
            class="viewer-option"
            type="button"
            aria-label="Volver a la portada del cuaderno"
            @click="opened = false"
          >
            <span aria-hidden="true">⌂</span>
            Cerrar portada
          </button>
        </div>
      </div>
    </template>

    <div
      v-if="zoom"
      class="zoom-layer"
      role="dialog"
      aria-modal="true"
      @click.self="zoom = null"
    >
      <button class="close" aria-label="Cerrar ampliación" @click="zoom = null">
        ×
      </button>
      <PageSheet :page="zoom" @zoom="zoom = null" />
    </div>
  </div>
</template>

<style scoped>
.cover-shell {
  width: min(100%, 480px);
  height: min(calc(100vh - 315px), 590px);
  border: 0;
  padding: 0;
  position: relative;
  display: grid;
  place-items: center;
  background: transparent;
  cursor: pointer;
}
.cover-shell > img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100vh - 315px);
  object-fit: contain;
}
.open-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  transform: translateX(-50%);
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(29, 30, 32, 0.88);
  padding: 0.8rem 1.15rem;
  color: #f3f0eb;
  font-size: 0.82rem;
  font-weight: 650;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}
.cover-shell:hover .open-label,
.cover-shell:focus-visible .open-label {
  background: var(--accent-orange);
  color: #1d1e20;
  transform: translate(-50%, -3px);
}
.book-paper {
  min-width: 0;
}
.book-controls {
  width: min(100%, 620px);
  margin: 0 auto;
  padding: 1rem clamp(0.75rem, 3vw, 1.4rem);
  border: 1px solid var(--line);
  border-radius: 1rem;
  background: var(--paper-deep);
}
.book-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.page-arrow {
  min-width: 2.8rem;
  min-height: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  padding: 0.55rem 0.85rem;
  font-size: 0.82rem;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}
.page-arrow:hover:not(:disabled),
.page-arrow:focus-visible:not(:disabled) {
  border-color: var(--accent-orange);
  background: var(--accent-orange);
  color: #1d1e20;
  transform: translateY(-1px);
}
.page-arrow:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}
.page-arrow > span:first-child,
.page-arrow > span:last-child {
  font-size: 1.05rem;
}
.page-status {
  display: grid;
  align-items: center;
  gap: 0.55rem;
  grid-auto-flow: column;
  justify-items: center;
  gap: 0.1rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.open-icon {
  width: 0.85rem;
  height: 0.85rem;
  object-fit: contain;
}
.page-status__number {
  color: var(--ink);
  font-size: 1.1rem;
  font-weight: 700;
}
.page-status__total,
.page-status__label {
  font-size: 0.72rem;
}
.page-progress {
  width: 100%;
  height: 1.1rem;
  display: block;
  margin: 0.65rem 0;
  accent-color: var(--accent-orange);
  cursor: pointer;
}
.book-options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.viewer-option {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  padding: 0.55rem 0.8rem;
  font-size: 0.78rem;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}
.viewer-option:hover,
.viewer-option:focus-visible,
.viewer-option[aria-pressed="true"] {
  border-color: rgba(255, 135, 74, 0.35);
  background: rgba(255, 135, 74, 0.1);
  color: var(--accent-orange);
}
.viewer-option span {
  font-size: 1rem;
}
.zoom-layer {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  background: rgba(32, 30, 26, 0.9);
  padding: 2rem;
}
.zoom-layer .book-paper {
  width: min(650px, 90vw);
  max-height: 90vh;
}
.close {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 2.5rem;
}
</style>
