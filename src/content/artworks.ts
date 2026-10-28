import type { Artwork } from "../types";
import { assetUrl } from "../utils/assetUrl";
export const artworks: Artwork[] = [
  {
    id: "ironman_crayon_drawing",
    title: "Ironman Crayon Drawing",
    year: 2021,
    image: assetUrl("images/gallery/crayon_ironman.png"),
    thumbnail: assetUrl("images/gallery/crayon_ironman.png"),
    alt: "Dibujo de Ironman con crayones",
    technique: "Crayon",
    tags: ["botánica", "grafito"],
    description: "Dibujo de Ironman elaborado con crayones, tomó alrededor de 7 horas.",
  },
  {
    id: "pen_hand_drawing",
    title: "pen hand",
    year: 2023,
    image: assetUrl("images/gallery/pen_hand.png"),
    thumbnail: assetUrl("images/gallery/pen_hand.png"),
    alt: "Dibujo de una mano realista con bolígrafo",
    technique: "bolígrafo",
    tags: ["objetos"],
    description: "Dibujo de una mano realista con bolígrafo.",
  },
 
];
