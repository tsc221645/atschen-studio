import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GalleryView from "../views/GalleryView.vue";
import LibraryView from "../views/LibraryView.vue";
import NotebookView from "../views/NotebookView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import NotFoundView from "../views/NotFoundView.vue";
export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/gallery", component: GalleryView },
    { path: "/library", component: LibraryView },
    { path: "/library/:slug", component: NotebookView },
    { path: "/about", component: AboutView },
    { path: "/contact", component: ContactView },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});
