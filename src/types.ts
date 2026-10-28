export interface Artwork {
  id: string;
  title: string;
  year: number;
  image: string;
  thumbnail: string;
  alt: string;
  technique?: string;
  description?: string;
  tags?: string[];
}
export interface PageElement {
  id: string;
  type: "drawing" | "note" | "label";
  src?: string;
  text?: string;
  alt?: string;
  x: number;
  y: number;
  width?: number;
  rotation?: number;
}
export interface NotebookPage {
  id: string;
  background?: string;
  fullPageImage?: string;
  elements?: PageElement[];
  alt: string;
}
export interface Notebook {
  id: string;
  slug: string;
  title: string;
  year: number;
  description: string;
  coverImage: string;
  coverAlt: string;
  status: "published" | "draft";
  pages: NotebookPage[];
  coverStyle?: "linen" | "kraft" | "sage";
}
