import "./assets/css/_variables.css";
import "./assets/css/_animations.css";
import "./assets/css/_themes.css";
import "./assets/css/_main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
