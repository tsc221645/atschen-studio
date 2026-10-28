<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { site } from "./content/site";
import { assetUrl } from "./utils/assetUrl";
const open = ref(false);
</script>
<template>
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <header class="site-header">
    <div class="page-shell header-inner">
      <RouterLink class="brand serif" to="/"
        ><span class="logo-slot" aria-hidden="true"
          ><img v-if="site.logo" :src="assetUrl(site.logo)" alt="" /></span
        >{{ site.artistName }}</RouterLink
      ><button
        class="menu-button"
        aria-label="Abrir menú"
        :aria-expanded="open"
        @click="open = !open"
      >
        ☰
      </button>
      <nav :class="['site-nav', { open }]" aria-label="Navegación principal">
        <RouterLink to="/gallery" @click="open = false">Gallery</RouterLink
        ><RouterLink to="/library" @click="open = false">Sketchbooks</RouterLink
        ><RouterLink to="/about" @click="open = false">About</RouterLink
        ><RouterLink to="/contact" @click="open = false">Contact</RouterLink>
      </nav>
    </div>
  </header>
  <main id="main"><RouterView /></main>
  <footer class="site-footer">
    <div class="page-shell footer-inner">
      <span>© {{ new Date().getFullYear() }} {{ site.artistName }}</span
      ><span class="muted">hecho despacio, publicado con cuidado</span>
    </div>
  </footer>
</template>
<style scoped>
.site-header {
  background: rgba(246, 241, 231, 0.88);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
}
.header-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.75rem;
  text-decoration: none;
}
.logo-slot {
  display: inline-flex;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}
.logo-slot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.brand span {
  color: var(--moss);
}
.site-nav {
  display: flex;
  gap: 1.4rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.site-nav a {
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;
}
.site-nav a.router-link-active {
  border-color: var(--moss);
}
.menu-button {
  display: none;
  border: 0;
  background: transparent;
  font-size: 1.3rem;
}
@media (max-width: 640px) {
  .menu-button {
    display: block;
  }
  .site-nav {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--paper);
    padding: 1rem 1.25rem;
    flex-direction: column;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
  .site-nav.open {
    display: flex;
  }
}
.site-footer {
  margin-top: 5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--line);
  font-size: 0.78rem;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
  }
}
</style>
