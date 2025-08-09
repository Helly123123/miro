<template>
  <div class="theme-switcher">
    <div
      class="theme-option"
      :class="{ active: !darkMode, hoverable: darkMode }"
      @click="setLightTheme"
    >
      <div class="theme-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="theme-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="theme-label">Светлая</span>
      </div>
      <div class="active-indicator" :class="{ active: !darkMode }"></div>
    </div>

    <div
      class="theme-option"
      :class="{ active: darkMode, hoverable: !darkMode }"
      @click="setDarkTheme"
    >
      <div class="theme-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="theme-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
        <span class="theme-label">Тёмная</span>
      </div>
      <div class="active-indicator" :class="{ active: darkMode }"></div>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from "@/stores/theme";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useThemeStore, ["darkMode"]),
  },
  methods: {
    ...mapActions(useThemeStore, ["toggleTheme", "initializeTheme"]),
    setLightTheme() {
      if (this.darkMode) this.toggleTheme();
    },
    setDarkTheme() {
      if (!this.darkMode) this.toggleTheme();
    },
  },
  mounted() {
    this.initializeTheme();
  },
};
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 12px;
  border-radius: 16px;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.theme-option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--card);
  width: 300px;
  height: 80px;
  border-radius: 12px;
  /* border: 1px solid black; */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-option.hoverable:hover {
  border: 1px solid #5ab8c7;
  background: var(--theme-option-hover, rgba(0, 0, 0, 0.05));
}

.dark .theme-option.hoverable:hover {
  --theme-option-hover: rgba(255, 255, 255, 0.05);
}

.theme-option.active {
  border: 1px solid #5ab8c7;
  box-shadow: 0 4px 12px rgba(90, 184, 199, 0.3);
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
}

.dark .theme-option.active {
  --theme-option-active: #4a5568;
}

.theme-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.theme-icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.theme-option.active .theme-icon {
}

.dark .theme-option.active .theme-icon {
  --theme-icon-active: #60a5fa;
}

.theme-label {
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.dark .theme-option.active .theme-label {
  --theme-label-active: #f3f4f6;
}

.active-indicator {
  position: absolute;
  bottom: -4px;
  width: 0;
  height: 3px;
  /* background: var(--active-indicator, #3b82f6); */
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .active-indicator {
  --active-indicator: #60a5fa;
}

.active-indicator.active {
  width: 60%;
}
</style>
