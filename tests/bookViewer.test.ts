import { createApp, nextTick } from "vue";
import { expect, it } from "vitest";
import BookViewer from "../src/components/BookViewer.vue";
import { notebooks } from "../src/content/notebooks";

it("opens the Mini photos, switches mode, navigates and closes without render errors", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const app = createApp(BookViewer, { notebook: notebooks[0] });
  const errors: unknown[] = [];
  app.config.errorHandler = (error) => errors.push(error);
  app.mount(host);
  const click = async (label: string) => {
    const button = [...host.querySelectorAll("button")].find((b) => b.textContent?.includes(label));
    expect(button).toBeTruthy();
    button!.click();
    await nextTick();
  };
  try {
    await click("Abrir cuaderno");
    expect(errors).toEqual([]);
    expect([...host.querySelectorAll(".book-paper__full")].map((img) => img.getAttribute("src"))).toEqual([
      notebooks[0].pages[0].fullPageImage,
      notebooks[0].pages[1].fullPageImage,
    ]);
    await click("Vista individual");
    expect(host.querySelectorAll(".book-paper__full")).toHaveLength(1);
    await click("Siguiente");
    expect(host.querySelector(".book-paper__full")?.getAttribute("src")).toBe(notebooks[0].pages[1].fullPageImage);
    await click("Cerrar portada");
    expect(host.querySelector(".cover-shell")).toBeTruthy();
    expect(errors).toEqual([]);
  } finally {
    app.unmount();
    host.remove();
  }
});
