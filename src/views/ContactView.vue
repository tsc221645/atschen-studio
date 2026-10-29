<script setup lang="ts">
import { site } from "../content/site";
import { assetUrl } from "../utils/assetUrl";
</script>
<template>
  <section class="page-shell prose-view">

    <h1 class="serif">Contact</h1>
    <p class="statement">
      Para encargos, colaboraciones o comentarios:
    </p>
    <nav class="socials" aria-label="Redes sociales y correo">
      <a
        v-for="social in site.socials"
        :key="social.label"
        class="social-link"
        :href="social.href"
        target="_blank"
        rel="noreferrer"
      >
        <img
          class="social-icon"
          :src="
            assetUrl(
              social.label === 'Instagram'
                ? 'assets/ig_icon.png'
                : 'assets/li_icon.png',
            )
          "
          alt=""
          aria-hidden="true"
        />
        <span>{{ social.label }}</span>
        <img
          class="social-arrow"
          :src="assetUrl('assets/open_icon.png')"
          alt=""
          aria-hidden="true"
        />
      </a>
      <a class="social-link" :href="`mailto:${site.email}`">
        <img
          class="social-icon"
          :src="assetUrl('assets/gmail_icon.png')"
          alt=""
          aria-hidden="true"
        />
        <span>Correo</span>
        <img
          class="social-arrow"
          :src="assetUrl('assets/open_icon.png')"
          alt=""
          aria-hidden="true"
        />
      </a>
    </nav>
  </section>
</template>
<style scoped>
.prose-view {
  padding-top: 5rem;
  min-height: 65vh;
}
.prose-view h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  margin: 0.5rem 0 3rem;
}
.statement {
  font: clamp(1.5rem, 3vw, 2.5rem) / 1.3 var(--display-font);
  letter-spacing: -0.035em;
  max-width: 650px;
}
.email {
  display: inline-block;
  font: clamp(1.5rem, 4vw, 3rem) var(--display-font);
  font-weight: 650;
  letter-spacing: -0.04em;
  color: var(--accent-orange);
  margin: 2rem 0;
  text-decoration-color: var(--accent-red);
  text-underline-offset: 0.2em;
  transition: color 0.25s ease;
}
.email:hover,
.email:focus-visible {
  color: var(--accent-yellow);
}
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.social-link {
  min-width: 9.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid var(--line);
  border-radius: 0.8rem;
  background: var(--paper-deep);
  color: var(--muted);
  padding: 0.85rem 1rem;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}
.social-link:hover,
.social-link:focus-visible {
  border-color: var(--accent-orange);
  color: var(--accent-yellow);
  transform: translateY(-2px);
}
.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
  object-fit: contain;
}
.social-arrow {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: auto;
  object-fit: contain;
}
</style>
