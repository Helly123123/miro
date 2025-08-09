// stores/theme.js
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      document.documentElement.setAttribute(
        "data-theme",
        this.darkMode ? "dark" : "light"
      );
      localStorage.setItem("darkMode", this.darkMode);
    },
    initializeTheme() {
      const savedMode = localStorage.getItem("darkMode") === "true";
      this.darkMode = savedMode;
      document.documentElement.setAttribute(
        "data-theme",
        this.darkMode ? "dark" : "light"
      );
    },
  },
});
