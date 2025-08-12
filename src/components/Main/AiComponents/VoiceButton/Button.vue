<template>
  <div class="voice-container">
    <Station
      :start="handleStationClick"
      :station="station"
      :active-color="buttonColor"
    />

    <div class="speech-feedback" v-if="isListening || isProcessing">
      <div v-if="!finalTranscript" class="interim-result-cont">
        <span class="interim-result-title">Ваша речь:</span>
        <span class="interim-result">{{ interimTranscript }}</span>
      </div>
      <div class="final-result-cont" v-if="finalTranscript">
        <span class="final-result-title">Ваш запрос:</span>
        <span class="final-result">"{{ finalTranscript }}"</span>
      </div>
    </div>

    <div class="ai-response" v-if="aiResponse">
      <div class="ai-response-scroll-container">
        <div class="ai-response-text-cont">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2"
              />
              <path
                d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="m18 2l3 3l-3 3M6 22l-3-3l3-3" />
              <path d="M21 5H10a7 7 0 0 0-7 7m0 7h11a7 7 0 0 0 7-7" />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="status-message" v-if="statusMessage">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import axios from "axios";
import Station from "./Stations/Station.vue";

import { useAccountStore } from "@/stores/userStore";
const accountStore = useAccountStore();

const currentPromt = computed(() => accountStore.currentPromt);

const API_KEY =
  "sk-M8UZ161diRmekfAHIitPFGVTpk0BsB4MEmzxgE6wCtnjw1SJau0Q4uHdIp8G";
const CHAT_API_ENDPOINT = "https://api.gen-api.ru/api/v1/networks/gpt-5";
const TTS_API_ENDPOINT = "https://api.gen-api.ru/api/v1/networks/tts";

// Состояния
const station = ref(""); // listening | thinks | says
const interimTranscript = ref("");
const finalTranscript = ref("");
const aiResponse = ref("ТЕСТОВОЕ СООБЩЕНИЕ");
const statusMessage = ref("");
const recognition = ref(null);
const isListening = ref(false);
const isProcessing = ref(false);
const audioPlayer = ref(null);

// Цвета кнопки
const buttonColor = computed(() => {
  switch (station.value) {
    case "listening":
      return "#ff6b6b";
    case "thinks":
      return "#feca57";
    case "says":
      return "#1dd1a1";
    default:
      return "#5ab8c7";
  }
});

// Инициализация распознавания речи
const initSpeechRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    statusMessage.value = "Ваш браузер не поддерживает распознавание речи";
    return null;
  }

  const recognizer = new SpeechRecognition();
  recognizer.lang = "ru-RU";
  recognizer.continuous = true;
  recognizer.interimResults = true;

  return recognizer;
};

// Остановка аудио (без сброса состояния)
const stopAudio = async () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value = null;
  }
};

// Сброс состояния (только по явному вызову)
const resetState = () => {
  station.value = "";
  aiResponse.value = "";
  finalTranscript.value = "";
  interimTranscript.value = "";
  isListening.value = false;
  isProcessing.value = false;
  statusMessage.value = "";
};

// Воспроизведение аудио (без автосброса)
const playAudio = (url) => {
  return new Promise((resolve) => {
    stopAudio();

    audioPlayer.value = new Audio(url);
    audioPlayer.value.play();

    audioPlayer.value.onended = () => {
      resolve();
      // Состояние НЕ сбрасывается автоматически
    };

    audioPlayer.value.onerror = () => {
      resolve();
      statusMessage.value = "Ошибка воспроизведения";
    };
  });
};

// Обработчик клика по кнопке
const handleStationClick = async () => {
  console.log("say");
  if (station.value === "says") {
    await stopAudio(); // Только останавливаем аудио, состояние остается "says"
    startListening();
  } else if (station.value === "") {
    startListening();
  } else {
    // Для других состояний (listening/thinks) сохраняем текущую логику
    toggleVoice();
  }
};

// Запуск/остановка записи
const toggleVoice = () => {
  if (isListening.value) {
    stopListening();
  } else {
    startListening();
  }
};

const startListening = () => {
  recognition.value = initSpeechRecognition();
  if (!recognition.value) return;

  resetState();
  station.value = "listening";
  isListening.value = true;

  recognition.value.onresult = (event) => {
    interimTranscript.value = "";
    finalTranscript.value = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript.value += transcript;
      } else {
        interimTranscript.value += transcript;
      }
    }
  };

  recognition.value.onerror = (event) => {
    statusMessage.value = `Ошибка распознавания: ${event.error}`;
    resetState();
  };

  recognition.value.start();
};

const stopListening = async () => {
  if (!recognition.value) return;

  recognition.value.stop();

  if (!finalTranscript.value) {
    resetState();
    return;
  }

  station.value = "thinks";
  isListening.value = false;
  isProcessing.value = true;

  try {
    console.log(currentPromt.value);
    // 1. Генерация текста ответа
    const chatResponse = await axios.post(
      CHAT_API_ENDPOINT,
      {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: finalTranscript.value,
              },
            ],
          },
        ],
        is_sync: true,
        temperature: 0.7,
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const botText = chatResponse.data.response[0].message.content;

    // 2. Генерация аудио
    const ttsResponse = await axios.post(
      TTS_API_ENDPOINT,
      {
        input: botText,
        voice: "shimmer",
        is_sync: true,
        response_format: "mp3",
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const audioUrl = ttsResponse.data.response[0];

    // 3. Показываем текст и воспроизводим
    aiResponse.value = botText;
    station.value = "says";
    await playAudio(audioUrl);
  } catch (error) {
    console.error("Ошибка:", error);
    statusMessage.value = "Ошибка генерации";
    resetState();
  } finally {
    isProcessing.value = false;
  }
};

// Очистка при размонтировании
onUnmounted(() => {
  stopAudio();
  if (recognition.value) {
    recognition.value.stop();
  }
});
</script>

<style scoped>
.voice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.speech-feedback {
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--feedback);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.interim-result-cont,
.final-result-cont {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.interim-result-title,
.final-result-title {
  font-size: 14px;
  font-weight: 500;
}

.interim-result {
  color: #666;
  font-style: italic;
}

.final-result {
  color: var(--text);
  font-weight: 600;
}

.ai-response {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--card);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* max-height: 40vh; */
}

.ai-response-scroll-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ai-response-text-cont {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  overflow-y: auto;
  max-height: 40vh;
}

.ai-response-title {
  font-weight: 600;

  padding: 15px 15px 0;
  display: block;
}

.ai-response-text {
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  color: var(--voice-text);
}

.status-message {
  font-size: 14px;
  margin-top: 10px;
}

/* Стили для скроллбара */
.ai-response-text-cont::-webkit-scrollbar {
  width: 8px;
}

.ai-response-text-cont::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.ai-response-text-cont::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.ai-response-text-cont::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .voice-container {
    padding: 15px;
    gap: 15px;
  }

  .ai-response-text-cont {
    padding: 10px;
    max-height: 40vh;
  }

  .ai-response-title,
  .interim-result-title,
  .final-result-title {
    font-size: 13px;
  }

  .interim-result,
  .final-result,
  .ai-response-text {
    font-size: 15px;
  }
}
</style>
