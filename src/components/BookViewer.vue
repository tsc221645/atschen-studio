<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { Notebook, NotebookPage } from "../types";
import { useNotebookNavigation } from "../composables/useNotebookNavigation";
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
        <span class="open-label">Abrir cuaderno</span>
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

      <div class="book-toolbar">
        <button
          class="icon-button"
          :disabled="!nav.canPrevious"
          @click="move(-1)"
        >
          ← Anterior
        </button>
        <span
          >{{
            nav.mode === "book"
              ? `páginas ${nav.index + 1}–${Math.min(nav.index + 2, notebook.pages.length)}`
              : `página ${nav.index + 1}`
          }}
          / {{ notebook.pages.length }}</span
        >
        <button class="icon-button" :disabled="!nav.canNext" @click="move(1)">
          Siguiente →
        </button>
        <button
          class="icon-button"
          @click="nav.mode = nav.mode === 'book' ? 'single' : 'book'"
        >
          {{ nav.mode === "book" ? "Vista individual" : "Vista libro" }}
        </button>
        <button class="icon-button" @click="opened = false">
          Cerrar portada
        </button>
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
  transform: translateX(-50%);
  background: rgba(20, 20, 15, 0.55);
  padding: 0.65rem 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
}
.book-paper {
  min-width: 0;
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
