import { describe, expect, it } from "vitest";
import { useNotebookNavigation } from "../src/composables/useNotebookNavigation";
import { notebooks } from "../src/content/notebooks";
describe("useNotebookNavigation", () => {
  it("clamps and changes page index", () => {
    const nav = useNotebookNavigation(notebooks[0]);
    nav.go(99);
    expect(nav.index.value).toBe(4);
    nav.go(-99);
    expect(nav.index.value).toBe(0);
    nav.setIndex(2);
    expect(nav.current.value.id).toBe("mini-03");
  });
});
