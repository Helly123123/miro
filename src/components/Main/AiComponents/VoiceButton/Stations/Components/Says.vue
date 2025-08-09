<template>
  <div class="button-voice">
    <div class="voice-icon-container">
      <svg
        class="voice-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632M7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2s-.672 2-1.5 2S7 13.104 7 12m8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2s1.5.896 1.5 2s-.672 2-1.5 2"
        />
      </svg>
      <div class="sound-waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--voice-button-bg);
  align-items: center;
  color: var(--voice-button-text);
  font-weight: bold;
  user-select: none;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 10px 30px rgba(90, 184, 199, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.text {
  position: relative;
  z-index: 3;
  margin-top: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

svg path {
  fill: var(--voice-button-bot);
}

.voice-icon-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.voice-icon {
  width: 80px;
  height: 80px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: iconPulse 1.2s infinite ease-in-out;
  z-index: 2;
}

/* Звуковые волны */
.sound-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--voice-button-border);
  border-radius: 50%;
  opacity: 0;
}

.wave:nth-child(1) {
  width: 80%;
  height: 80%;
  animation: soundWave 2s infinite linear;
}

.wave:nth-child(2) {
  width: 100%;
  height: 100%;
  animation: soundWave 2s infinite 0.5s linear;
}

.wave:nth-child(3) {
  width: 120%;
  height: 120%;
  animation: soundWave 2s infinite 1s linear;
}

/* Ключевые кадры анимации */
@keyframes iconPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

@keyframes soundWave {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
