<script setup lang="ts">
import { onMounted } from "vue";
import ApiRequestService from "./api/request";
import { type Result } from "./interface/ResponseType.ts";

const requestHeader = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const requestData = {
  msgId: "msgid1",
  msg: "msg1",
};

async function fetchData(path: string, method: string) {
  if (method == "GET") {
    await ApiRequestService.get<Result>(path, requestData).then((response) => {
      console.log(response);
    });
  } else if (method == "POST") {
    await ApiRequestService.post<Result>(path, requestData, requestHeader).then(
      (response) => {
        console.log(response);
      }
    );
  }
}

onMounted(() => {
  console.log("App Mounted...");
  fetchData("/", "GET");
  fetchData("/redis-test", "POST");
  fetchData("/log/tail", "GET");
});
</script>

<template>
  <div>
    <button @click="fetchData('/', 'GET')">Axios - GET</button>
    <br />
    <br />
    <button @click="fetchData('/redis-test', 'POST')">Axios - POST</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
