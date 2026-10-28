import { computed, ref } from "vue";
import type { Notebook } from "../types";
export function useNotebookNavigation(notebook: Notebook) {
  const index = ref(0);
  const mode = ref<"book" | "single">("book");
  const current = computed(() => notebook.pages[index.value]);
  const canPrevious = computed(() => index.value > 0);
  const canNext = computed(() => index.value < notebook.pages.length - 1);
  function go(delta: number) {
    index.value = Math.min(
      Math.max(index.value + delta, 0),
      notebook.pages.length - 1,
    );
  }
  function setIndex(value: number) {
    index.value = Math.min(Math.max(value, 0), notebook.pages.length - 1);
  }
  return { index, mode, current, canPrevious, canNext, go, setIndex };
}
