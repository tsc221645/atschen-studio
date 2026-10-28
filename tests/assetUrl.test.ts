import { describe, expect, it } from "vitest";
import { assetUrl } from "../src/utils/assetUrl";
describe("assetUrl", () => {
  it.each(["drawing.jpg", "drawing.JPG", "drawing.png", "drawing.PNG"])(
    "preserves the image filename %s",
    (filename) => {
      expect(assetUrl(`images/gallery/${filename}`)).toBe(
        `/images/gallery/${filename}`,
      );
    },
  );
  it("removes leading slashes and preserves base", () => {
    expect(assetUrl("/images/a.svg")).toBe("/images/a.svg");
  });
});
