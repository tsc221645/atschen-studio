<script setup lang="ts">
import { RouterLink } from "vue-router";
import { site } from "../content/site";
import { artworks } from "../content/artworks";
import { notebooks } from "../content/notebooks";
</script>
<template>
  <div class="home">
    <section class="hero page-shell">
      <div>
        <p class="eyebrow">Portafolio / cuadernos / observación</p>
        <h1 class="serif">{{ site.tagline }}</h1>
        <p class="lead">{{ site.intro }}</p>
        <div class="actions">
          <RouterLink class="button" to="/gallery">Ver obra</RouterLink
          ><RouterLink class="text-link" to="/library"
            >Entrar a los cuadernos →</RouterLink
          >
        </div>
      </div>
      <div class="hero-art paper-panel">
        <img :src="artworks[0].image" :alt="artworks[0].alt" /><span
          >obra de muestra · reemplazable</span
        >
      </div>
    </section>
    <section class="page-shell home-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Una práctica en papel</p>
          <h2 class="serif">Lo que se queda entre páginas</h2>
        </div>
        <RouterLink class="text-link" to="/about"
          >conoce mi arte →</RouterLink
        >
      </div>
      <p class="intro-copy">
        Una colección de dibujos y obras de arte. Me gusta mostrar
        los dibujos como son. Entre mis obras encuentras dibujos sin terminar,
        sin pulir, todo con el propósito de compartir un poco de mi.
      </p>
    </section>
    <section class="page-shell home-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selección</p>
          <h2 class="serif">Tres cuadernos</h2>
        </div>
        <RouterLink class="text-link" to="/library"
          >Ver biblioteca →</RouterLink
        >
      </div>
      <div class="mini-books">
        <RouterLink
          v-for="book in notebooks"
          :key="book.id"
          :to="`/library/${book.slug}`"
          class="mini-book"
          ><img :src="book.coverImage" :alt="book.coverAlt" /><span
            >{{ book.title }} · {{ book.year }}</span
          ></RouterLink
        >
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(2rem, 8vw, 7rem);
  align-items: center;
  padding-top: clamp(4rem, 10vw, 8rem);
}
h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  font-weight: 400;
  max-width: 760px;
  margin: 1rem 0;
}
.lead {
  font:
    1.25rem/1.55 Georgia,
    serif;
  max-width: 450px;
  color: var(--muted);
}
.actions {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.hero-art {
  padding: 1rem;
  transform: rotate(2deg);
}
.hero-art img {
  display: block;
  width: 100%;
  aspect-ratio: 1/1.15;
  object-fit: cover;
}
.hero-art span {
  display: block;
  padding-top: 0.8rem;
  font-size: 0.7rem;
  color: var(--muted);
  text-align: center;
}
.home-section {
  margin-top: clamp(5rem, 12vw, 10rem);
  max-width: 1000px;
}
.intro-copy {
  font:
    clamp(1.35rem, 3vw, 2.2rem) / 1.35 Georgia,
    serif;
  max-width: 780px;
}
.mini-books {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 700px;
}
.mini-book {
  text-decoration: none;
  color: var(--ink);
}
.mini-book img {
  display: block;
  width: 100%;
  aspect-ratio: 1.2/1;
  object-fit: cover;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
  transition: transform 0.25s;
}
.mini-book:hover img {
  transform: rotate(-1deg) translateY(-4px);
}
@media (max-width: 720px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-art {
    max-width: 430px;
  }
  .mini-books {
    grid-template-columns: 1fr;
  }
  .section-heading {
    align-items: start;
    flex-direction: column;
  }
}
</style>
