<script setup lang="ts">
import type { NotebookPage } from "../types";
import { ref } from "vue";

const props = defineProps<{ page: NotebookPage }>();
const emit = defineEmits<{ zoom: [page: NotebookPage] }>();
const ratio = ref(1 / 1.22);
function measure(event: Event) {
  const image = event.target as HTMLImageElement;
  if (image.naturalHeight)
    ratio.value = image.naturalWidth / image.naturalHeight;
}
</script>

<template>
  <div
    class="book-paper"
    :style="{ '--page-ratio': ratio }"
    @dblclick="emit('zoom', props.page)"
  >
    <img
      v-if="props.page.fullPageImage"
      class="book-paper__full"
      :src="props.page.fullPageImage"
      :alt="props.page.alt"
      @load="measure"
    />
    <template v-else>
      <span
        v-for="element in props.page.elements || []"
        :key="element.id"
        class="book-element"
        :class="{ 'book-note': element.type !== 'drawing' }"
        :style="{
          left: `${element.x}%`,
          top: `${element.y}%`,
          width:
            element.type === 'drawing' ? `${element.width || 30}%` : undefined,
          transform: `translate(-50%, -50%) rotate(${element.rotation || 0}deg)`,
        }"
      >
        <img
          v-if="element.type === 'drawing' && element.src"
          :src="element.src"
          :alt="element.alt || ''"
        />
        <span v-else>{{ element.text }}</span>
      </span>
    </template>
  </div>
</template>
