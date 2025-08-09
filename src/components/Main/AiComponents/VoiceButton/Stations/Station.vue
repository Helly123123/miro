<template>
  <Listening @click="start" v-if="station === 'listening'" />
  <Thinks v-if="station === 'thinks'" />
  <Says @click="start" v-if="station === 'says'" />
  <Default @click="start" v-if="station === ''" />
</template>

<script setup>
import Listening from "./Components/Listening.vue";
import Default from "./Components/Default.vue";
import Thinks from "./Components/Thinks.vue";
import Says from "./Components/Says.vue";
import { toRefs } from "vue";
const props = defineProps({
  station: {
    type: String,
  },
  start: {
    type: Function,
  },
});
</script>

<style scoped></style>
