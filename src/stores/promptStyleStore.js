import { defineStore } from "pinia";

export const usePromptStyleStore = defineStore("promptStyleStore", {
  state: () => ({
    // Основные стили промптов
    promptStyles: ["normal", "funny", "serious", "creative"],
    currentStyle: "normal",
    customInstructions: "",

    // Текстовые описания стилей
    styleTexts: {
      normal: "Обычный",
      funny: "Смешной",
      serious: "Серьёзный",
      creative: "Креативный",
    },

    // Состояние фильтров (если нужно)
    filterState: {
      normal: true,
      funny: true,
      serious: true,
      creative: true,
    },
  }),

  getters: {
    getCurrentStyle: (state) => state.currentStyle,
    getCurrentStyleText: (state) => state.styleTexts[state.currentStyle],
    getCustomInstructions: (state) => state.customInstructions,
    getPromptStyles: (state) => state.promptStyles,
    getStyleTexts: (state) => state.styleTexts,
    getFilterState: (state) => state.filterState,

    // Геттер для формирования полного промпта
    getFullPrompt: (state) => (userPrompt) => {
      const prefixes = {
        normal: "",
        funny: "Ответь в шутливой манере, используй юмор: ",
        serious: "Ответь максимально формально: ",
        creative: "Ответь креативно с неожиданными сравнениями: ",
      };

      return `${prefixes[state.currentStyle]} ${
        state.customInstructions
      } ${userPrompt}`.trim();
    },
  },

  actions: {
    setCurrentStyle(style) {
      if (this.promptStyles.includes(style)) {
        this.currentStyle = style;
      }
    },

    setCustomInstructions(instructions) {
      this.customInstructions = instructions;
    },

    setStyleText(style, text) {
      if (this.promptStyles.includes(style)) {
        this.styleTexts[style] = text;
      }
    },

    setFilterState(filterState) {
      this.filterState = filterState;
    },

    // Сброс к настройкам по умолчанию
    resetStyles() {
      this.currentStyle = "normal";
      this.customInstructions = "";
      this.filterState = {
        normal: true,
        funny: true,
        serious: true,
        creative: true,
      };
    },

    // Добавление нового стиля
    addStyle(style, text) {
      if (!this.promptStyles.includes(style)) {
        this.promptStyles.push(style);
        this.styleTexts[style] = text;
        this.filterState[style] = true;
      }
    },
  },

  persist: true,
});
