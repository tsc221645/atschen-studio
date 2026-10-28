import { describe, expect, it } from "vitest";
import { validateNotebook } from "../src/utils/notebookValidation";
import { notebooks } from "../src/content/notebooks";
describe("validateNotebook", () => {
  it("accepts demo notebooks", () =>
    notebooks.forEach((book) => expect(validateNotebook(book)).toEqual([])));
  it("rejects mixed full page content", () => {
    const book = {
      ...notebooks[0],
      pages: [{ ...notebooks[0].pages[2], fullPageImage: "x" }],
    };
    expect(validateNotebook(book)).toContain(
      "página 1: fullPageImage no debe combinarse con elements",
    );
  });
});
