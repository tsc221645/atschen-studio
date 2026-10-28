# atschen studio

Portafolio editorial estático construido con Vue 3, Vite, TypeScript y Vue Router. Incluye Gallery, biblioteca de cuadernos, visor de páginas, About y Contact sin backend ni login.

## Desarrollo

```bash
npm install
npm run dev
npm run typecheck
npm run test:run
npm run build
npm run preview
```

El router usa hash history y los assets se resuelven con `assetUrl()`. Para probar la ruta de GitHub Pages en PowerShell:

```powershell
$env:VITE_BASE_PATH='/atschen-studio/'
npm run build
```

## Contenido

- Obras: editar `src/content/artworks.ts` y colocar imágenes optimizadas en `public/images/gallery/`.
- Cuadernos: editar `src/content/notebooks.ts` y colocar portadas/páginas en `public/images/notebooks/<slug>/`.
- Datos globales: `src/content/site.ts`.
- Las imágenes incluidas son SVG demo reemplazables por obra propia.

Para publicar portadas y páginas, agrega la imagen al repositorio y actualiza `coverImage` o `fullPageImage` en los datos. Se admiten JPG, PNG y WebP; conserva exactamente el nombre y la extensión, incluidas sus mayúsculas. Para Gallery actualiza `image` y `thumbnail`.

El espacio del logo está en el encabezado: guarda tu logo en `public/images/logo.png` y configura `logo: "images/logo.png"` en `src/content/site.ts`. Mientras `logo` esté vacío, solo se reserva el espacio. Puedes usar JPG, PNG, WebP o SVG.

El favicon está conectado a `public/favicon.svg`. Reemplaza ese archivo por tu icono; para usar PNG cambia el enlace y su tipo en `index.html`.

## GitHub Pages

El workflow está en `.github/workflows/deploy.yml` y está preparado para `atschen-studio`: `https://USUARIO.github.io/atschen-studio/`. Si usas un repositorio `USUARIO.github.io`, cambia `VITE_BASE_PATH` a `/`.

En GitHub: crea el repositorio, sube la rama `main`, entra a **Settings → Pages**, selecciona **GitHub Actions** como Source y revisa que Actions tenga permiso para ejecutar workflows.

## Limitaciones

GitHub Pages solo sirve archivos estáticos. Las portadas seleccionadas desde el navegador no se suben automáticamente al repositorio ni se comparten con visitantes.
