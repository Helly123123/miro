<template>
  <div class="button-voice">
    <div class="dots-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div class="loading-circle"></div>
    <div class="pulse-effect"></div>
  </div>
</template>

<script setup>
// Анимация работает автоматически, скрипт не нужен
</script>

<style scoped>
.button-voice {
  width: 250px;
  height: 250px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--voice-button-bg);
  align-items: center;
  color: white;
  font-weight: bold;
  user-select: none;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 10px 20px rgba(90, 184, 199, 0.3),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.text {
  position: relative;
  z-index: 2;
  margin-top: 15px;
}

.dots-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  height: 20px;
  align-items: flex-end;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
}

.loading-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.pulse-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 0;
}

/* Анимации */
.dot:nth-child(1) {
  animation: dotPulse 1.5s infinite ease-in-out;
}
.dot:nth-child(2) {
  animation: dotPulse 1.5s infinite 0.2s ease-in-out;
}
.dot:nth-child(3) {
  animation: dotPulse 1.5s infinite 0.4s ease-in-out;
}

.loading-circle {
  animation: rotate 2s infinite linear;
}

.pulse-effect {
  animation: pulse 3s infinite alternate ease-in-out;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: translateY(10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.05);
    opacity: 0.1;
  }
}
</style>
