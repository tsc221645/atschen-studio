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
        id: "page0",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page-01.svg"),
      },
      {
        id: "page1",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page1.svg"),
      },
      {
        id: "page2",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page2.svg"),
      },
      {
        id: "page3",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page3.svg"),
      },
      {
        id: "page4",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page4.svg"),
      },
      {
        id: "page5",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page5.svg"),
      },
      {
        id: "page6",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page6.svg"),
      },
      {
        id: "page7",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page7.svg"),
      },
      {
        id: "page8",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page8.svg"),
      },
      {
        id: "page9",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page9.svg"),
      },
      {
        id: "page10",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page10.svg"),
      },
      {
        id: "page11",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page11.svg"),
      },
      {
        id: "page12",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page12.svg"),
      },
      {
        id: "page13",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page13.svg"),
      },
      {
        id: "page14",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page14.svg"),
      },
      {
        id: "page15",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/standard/page15.svg"),
      },
    
    ],
  },
  {
    id: "nb-big-2026",
    slug: "big-sketchbook-2026",
    title: "Big Sketchbook 2026",
    year: 2026,
    description:
      "Páginas amplias para trabajos largos, composiciones y sketches mas detallados.",
    coverImage: cover("big", "cover.png"),
    coverAlt: "Portada del Big Sketchbook 2026",
    status: "published",
    coverStyle: "kraft",
    pages: [
      {
        id: "page1",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/big/page1.svg"),
      },
      {
        id: "page2",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/big/page2.svg"),
      },
      {
        id: "page3",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/big/page3.svg"),
      },
      {
        id: "page4",
        alt: "Página escaneada del Sketchbook 2026",
        fullPageImage: assetUrl("images/notebooks/big/page4.svg"),
      },
    ],
  },
   {
    id: "nb-standard-2023",
    slug: "sketchbook-2023",
    title: "Sketchbook 2023",
    year: 2023,
    description:
      "Este es mi sketchbook del año 2023, no esta completo porque me enfoqué más en la u.",
    coverImage: cover("2023sketchbook", "cover.svg"),
    coverAlt: "Portada del Sketchbook 2023",
    status: "published",
    coverStyle: "linen",
    pages: [
      {
        id: "page0",
        alt: "Página escaneada del Sketchbook 2023",
        fullPageImage: assetUrl("images/notebooks/standard/page-01.svg"),
      }
    
    ],
  },
  {
    id: "nb-standard-2021",
    slug: "sketchbook-2021",
    title: "Sketchbook 2021",
    year: 2021,
    description:
      "Este es mi sketchbook del año 2021, a mediados de pandemia.",
    coverImage: cover("2021sketchbook", "cover.svg"),
    coverAlt: "Portada del Sketchbook 2021",
    status: "published",
    coverStyle: "linen",
    pages: [
      {
        id: "page0",
        alt: "Página escaneada del Sketchbook 2021",
        fullPageImage: assetUrl("images/notebooks/standard/page-01.svg"),
      }
    
    ],
  },
  {
    id: "nb-standard-2019",
    slug: "sketchbook-2019",
    title: "Sketchbook 2019",
    year: 2019,
    description:
      "Este es mi sketchbook del año 2019, cuando todavía estaba en el colegio.",
    coverImage: cover("2019sketchbook", "cover.svg"),
    coverAlt: "Portada del Sketchbook 2019",
    status: "published",
    coverStyle: "linen",
    pages: [
      {
        id: "page0",
        alt: "Página escaneada del Sketchbook 2019",
        fullPageImage: assetUrl("images/notebooks/standard/page-01.svg"),
      }
    
    ],
  },
];
