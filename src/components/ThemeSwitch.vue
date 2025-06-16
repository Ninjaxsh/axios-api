<script setup lang="ts">
import { computed } from "vue";
import { currentThemeMode, toggleTheme } from "../utils/theme";

import BrightnessIcon from "../assets/brightness.svg";
import DarknessIcon from "../assets/darkness.svg";
import AutoDayNightIcon from "../assets/auto_day_night.svg";

const themeTip = computed(() => {
  switch (currentThemeMode.value) {
    case 'light':
      return '当前：浅色模式';
    case 'dark':
      return '当前：深色模式';
    default:
      return '当前：跟随系统';
  }
});
</script>

<template>
  <div class="theme-switch">
    <button class="theme-btn" @click="toggleTheme" :title="themeTip">
      <BrightnessIcon v-if="currentThemeMode === 'light'" />
      <DarknessIcon v-else-if="currentThemeMode === 'dark'" />
      <AutoDayNightIcon v-else />
    </button>
  </div>
</template>

<style scoped>
.theme-switch {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.3s;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.theme-btn:focus {
  outline: none;
}

.theme-btn svg {
  width: 30px;
  height: 30px;
}

.theme-btn:hover {
  background-color: var(--button-bg);
}
</style> 