<template>
  <div class="slider-wrapper">
    <div class="slider-container">
      <div
        class="slider"
        :style="{ transform: `translateX(${-currentIndex * 100}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="slide"
          :class="{
            active: currentIndex === index,
            selected: item === getVoiceStyle,
          }"
          @click="handleSlideClick(item, index)"
        >
          <div class="slide-content">
            {{ item }}
          </div>
        </div>
      </div>

      <div class="indicators">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="indicator"
          :class="{
            active: currentIndex === index,
            selected: item === getVoiceStyle,
          }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAccountStore } from "@/stores/userStore";

const accountStore = useAccountStore();
const getVoiceStyle = computed(() => accountStore.getVoiceStyle);

const items = ref(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);
const currentIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);

const setVoiceStyle = (item) => {
  accountStore.setVoiceStyle(item);
};

const handleSlideClick = (item, index) => {
  setVoiceStyle(item);
  goToSlide(index);
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    if (currentIndex.value < items.value.length - 1) {
      currentIndex.value++;
    }
  }

  if (touchEndX.value - touchStartX.value > 50) {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  }
};
</script>

<style scoped>
.slider-wrapper {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 10px 0;
}

.slider {
  display: flex;
  transition: transform 0.4s ease;
}

.slide {
  min-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.slide-content {
  background: var(--card);
  color: #555;
  border-radius: 12px;
  padding: 20px 15px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  /* height: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.slide.active .slide-content {
  background: var(--card);
  transform: scale(1.05);
}

.slide.selected .slide-content {
  border: 2px solid #6e8efb;
  background: var(--card);
  color: var(--voice-text);
  font-weight: 600;
}

.slide.active.selected .slide-content {
  background: var(--card);
  box-shadow: 0 4px 12px rgba(90, 184, 199, 0.3);
  border-color: #5ab8c7;
}

.indicators {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 6px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #5d5d5d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: var(--text);
  transform: scale(1.3);
}

.indicator.selected {
  background-color: #5ab8c7;
  transform: scale(1.1);
}

.indicator.active.selected {
  background-color: #4a6cf7;
  transform: scale(1.4);
}

.selected-item {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #eee;
}

@media (max-width: 380px) {
  .slide-content {
    height: 70px;
    font-size: 14px;
    padding: 15px 10px;
  }
}
</style>
