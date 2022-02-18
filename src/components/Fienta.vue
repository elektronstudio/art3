<script setup lang="ts">
import { ref } from "vue";
import { ETitle, EFormText, EButton } from "elektro";

const url = new URLSearchParams(window.location.search);
const urlCode = url.get("code");

const redirect = (code: string) =>
  (window.location.href = `https://live.elektron.art/fienta?code=${code}`);

if (urlCode) {
  redirect(urlCode);
}

const code = ref(urlCode || "");

const onSubmit = () => {
  if (code.value) {
    redirect(code.value);
  }
};
</script>

<template>
  <EFormText v-model="code" label="Ticket code" />
  <EButton color="accent" size="sm" @click="onSubmit">
    Submit ticket code
  </EButton>
</template>
