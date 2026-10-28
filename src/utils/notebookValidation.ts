import type { Notebook } from "../types";
export function validateNotebook(notebook: Notebook): string[] {
  const errors: string[] = [];
  if (!notebook.slug || !/^[a-z0-9-]+$/.test(notebook.slug))
    errors.push("slug inválido");
  if (!notebook.title) errors.push("título requerido");
  if (!notebook.pages.length) errors.push("debe tener al menos una página");
  notebook.pages.forEach((page, index) => {
    if (page.fullPageImage && page.elements?.length)
      errors.push(
        `página ${index + 1}: fullPageImage no debe combinarse con elements`,
      );
    if (!page.fullPageImage && !page.elements?.length)
      errors.push(`página ${index + 1}: falta contenido visual`);
  });
  return errors;
}
