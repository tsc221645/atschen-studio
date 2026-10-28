import type { Notebook } from "../types";
import { assetUrl } from "../utils/assetUrl";

const page = (
  id: string,
  alt: string,
  elements: Notebook["pages"][number]["elements"],
): Notebook["pages"][number] => ({ id, alt, elements });
const note = (
  id: string,
  text: string,
  x: number,
  y: number,
  rotation = -2,
) => ({ id, type: "note" as const, text, x, y, rotation });
const drawing = (
  id: string,
  src: string,
  alt: string,
  x: number,
  y: number,
  width: number,
) => ({ id, type: "drawing" as const, src: assetUrl(src), alt, x, y, width });
const cover = (folder: string, filename = "cover.svg") =>
  assetUrl(`images/notebooks/${folder}/${filename}`);

export const notebooks: Notebook[] = [
  {
    id: "nb-mini-2026",
    slug: "mini-sketchbook-2026",
    title: "Mini Sketchbook 2026",
    year: 2026,
    description:
      "Mi cuaderno que llevo a todos lados. Sketches rápidos de lo que se me ocurra.",
    coverImage: cover("mini", "cover.PNG"),
    coverAlt: "Portada del Mini Sketchbook 2026",
    status: "published",
    coverStyle: "sage",
    pages: [
      {
        id: "mini-01",
        alt: "Página 1 del Mini Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/mini/page1.jpg"),
      },
      {
        id: "mini-02",
        alt: "Página 2 del Mini Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/mini/page2.jpg"),
      },
      page("mini-03", "Página compuesta con un brote", [
        drawing(
          "d",
          "images/notebooks/mini/sprout.svg",
          "Brote dibujado",
          25,
          20,
          45,
        ),
        note("n", "empezar pequeño", 22, 80),
      ]),
      page("mini-04", "Página de notas breves", [
        note("n1", "martes / luz baja", 25, 24, -4),
        note("n2", "guardar la línea", 52, 60, 3),
        drawing(
          "d",
          "images/notebooks/mini/leaf.svg",
          "Hoja dibujada",
          70,
          25,
          25,
        ),
      ]),
      page("mini-05", "Página compuesta con una semilla", [
        drawing(
          "d",
          "images/notebooks/mini/seed.svg",
          "Semilla dibujada",
          45,
          38,
          42,
        ),
        note("n", "todavía en proceso", 25, 80),
      ]),
    ],
  },
  {
    id: "nb-standard-2026",
    slug: "sketchbook-2026",
    title: "Sketchbook 2026",
    year: 2026,
    description:
      "Sketchbook normal, con algunos dibujos un poco más detallados y variados.",
    coverImage: cover("standard", "cover.PNG"),
    coverAlt: "Portada del Sketchbook 2026",
    status: "published",
    coverStyle: "linen",
    pages: [
      {
        id: "standard-01",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page-01.svg"),
      },
      page("standard-02", "Página con una rama", [
        drawing(
          "d",
          "images/notebooks/standard/branch.svg",
          "Rama dibujada",
          35,
          28,
          55,
        ),
        note("n", "mirar antes de nombrar", 22, 82),
      ]),
      page("standard-03", "Página con dos formas botánicas", [
        drawing(
          "d1",
          "images/notebooks/standard/leaf.svg",
          "Hoja dibujada",
          18,
          30,
          30,
        ),
        drawing(
          "d2",
          "images/notebooks/standard/seed.svg",
          "Semilla dibujada",
          65,
          46,
          30,
        ),
        note("n", "dos formas de abrirse", 30, 80, 2),
      ]),
      {
        id: "standard-04",
        alt: "Página escaneada con anotaciones",
        fullPageImage: assetUrl("images/notebooks/standard/page-04.svg"),
      },
    ],
  },
  {
    id: "nb-big-2026",
    slug: "big-sketchbook-2026",
    title: "Big Sketchbook 2026",
    year: 2026,
    description:
      "Páginas amplias para trabajos largos, composiciones y manchas de color.",
    coverImage: cover("big", "cover.png"),
    coverAlt: "Portada del Big Sketchbook 2026",
    status: "published",
    coverStyle: "kraft",
    pages: [
      page("big-01", "Página amplia con una flor", [
        drawing(
          "d",
          "images/notebooks/big/flower.svg",
          "Flor dibujada",
          45,
          32,
          58,
        ),
        note("n", "dejar espacio alrededor", 24, 84),
      ]),
      {
        id: "big-02",
        alt: "Página escaneada del Big Sketchbook",
        fullPageImage: assetUrl("images/notebooks/big/page-02.svg"),
      },
      page("big-03", "Página con un objeto de estudio", [
        drawing(
          "d",
          "images/notebooks/big/cup.svg",
          "Taza dibujada",
          45,
          35,
          52,
        ),
        note("n", "el peso llega después", 28, 82, -3),
      ]),
      page("big-04", "Página de composición", [
        drawing(
          "d1",
          "images/notebooks/big/cloth.svg",
          "Tela dibujada",
          22,
          30,
          42,
        ),
        drawing(
          "d2",
          "images/notebooks/big/key.svg",
          "Llave dibujada",
          70,
          60,
          25,
        ),
        note("n", "inventario de domingo", 24, 84),
      ]),
    ],
  },
];
