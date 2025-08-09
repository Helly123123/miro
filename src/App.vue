<template>
  <div class="tg-app-container">
    <div class="tg-app">
      <Header :openSettings="changeSettings" />
      <router-view></router-view>
      <Settings :close="changeSettings" v-if="settings" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Main from "./components/Main/Main.vue";
import Header from "./components/Hedaer/Header/Header.vue";
import Settings from "./components/Settings/Settings.vue";
import { ref } from "vue";

const settings = ref(false);

const changeSettings = () => {
  settings.value = !settings.value;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tg-app-container {
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--tg-theme-secondary-bg-color, #f7f7f7);
}

.tg-app {
  width: 100%;
  max-width: 768px; /* Жёсткий лимит как в TG Desktop */
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  background-color: var(--background-color, #f8fafd);
  padding: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Лёгкая тень для объёма */
}

/* Адаптация под мобилки */
@media (max-width: 768px) {
  .tg-app {
    box-shadow: none; /* На мобилах тень не нужна */
  }
}
</style>
