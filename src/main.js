import "./assets/css/_variables.css";
import "./assets/css/_animations.css";
import "./assets/css/_themes.css";
import "./assets/css/_main.css";

import Main from "./pages/Main.vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: { title: "Аккаунты" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(pinia);
app.use(router);

// Затем монтируем приложение
app.mount("#app");
