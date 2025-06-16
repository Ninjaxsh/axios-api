<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import ApiRequestService from "./api/request";
import { type Result } from "./interface/ResponseType.ts";
import { currentThemeMode, toggleTheme } from "./utils/theme";

import BrightnessIcon from "./assets/brightness.svg";
import DarknessIcon from "./assets/darkness.svg";
import AutoDayNightIcon from "./assets/auto_day_night.svg";

const result = ref<Result>({
  code: "0",
  msg: "",
  data: null
});

const requestHeader = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const requestData = {
  msgId: "msgid1",
  msg: "msg1",
};

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

async function fetchData<Result>(
  path: string,
  method: string,
  requestData?: any,
  requestHeader?: any
): Promise<void> {
  try {
    let response: Result;
    if (method === "GET") {
      response = await ApiRequestService.get<Result>(path, requestData);
    } else if (method === "POST") {
      response = await ApiRequestService.post<Result>(
        path,
        requestData,
        requestHeader
      );
    } else {
      throw new Error(`Unsupported method: ${method}`);
    }
    // 将返回值赋予 result
    // @ts-ignore
    result.value = response;
  } catch (error) {
    // @ts-ignore
    result.value = {
      error: error instanceof Error ? error.message : String(error),
    } as any;
  }
}

onMounted(() => {
  // 可选：初始化时不自动请求
});
</script>

<template>
  <div>
    <div class="theme-switch">
      <button class="theme-btn" @click="toggleTheme" :title="themeTip">
        <BrightnessIcon v-if="currentThemeMode === 'light'" />
        <DarknessIcon v-else-if="currentThemeMode === 'dark'" />
        <AutoDayNightIcon v-else />
      </button>
    </div>
    <button @click="fetchData('/log/tail', 'GET')">Axios - GET - tail</button>
    <br />
    <br />
    <button @click="fetchData('/', 'GET')">Axios - GET - /</button>
    <br />
    <br />
    <button
      @click="fetchData('/redis-test', 'POST', requestData, requestHeader)"
    >
      Axios - POST - redis-test
    </button>
    <br />
    <br />
    <div>{{ result }}</div>
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
