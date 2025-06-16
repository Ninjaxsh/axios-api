<script setup lang="ts">
import { onMounted, ref } from "vue";
import ApiRequestService from "./api/request";
import { type Result } from "./interface/ResponseType.ts";
import ThemeSwitch from "./components/ThemeSwitch.vue";

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
    <ThemeSwitch />
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
</style>
