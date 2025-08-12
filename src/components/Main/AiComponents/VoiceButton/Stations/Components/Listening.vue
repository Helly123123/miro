<template>
  <div class="button-voice">
    <div class="inner-circle"></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <rect width="8" height="13" x="8" y="2" rx="4" />
        <path
          d="M18 16.292A7.98 7.98 0 0 1 12 19a7.98 7.98 0 0 1-6-2.708M12 19v3m-2 0h4"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
// Анимация работает автоматически
</script>

<style scoped>
.button-voice {
  width: 250px;
  height: 250px;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: var(--voice-button-bg);
  align-items: center;
  color: white;
  font-weight: bold;
  user-select: none;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 10px 20px rgba(90, 184, 199, 0.3);
  transition: all 0.3s;
  overflow: hidden;
}

.button-voice:hover {
  background-color: #4aa8b7;
  box-shadow: 0 15px 25px rgba(90, 184, 199, 0.4);
}

.inner-circle {
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite ease-in-out;
  z-index: 0;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}
</style>
