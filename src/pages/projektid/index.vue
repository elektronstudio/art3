<script setup lang="ts">
import { getFestivals } from "../../utils/strapi";
import { formatDatetime } from "elektro";

const festivals = await getFestivals();
</script>

<template>
  <div class="Page">
    <ETitle size="lg">Projektid</ETitle>
    <br />
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--gap-4);
      "
    >
      <a v-for="festival in festivals" :href="'/projektid/' + festival.slug">
        <!-- @TODO: Add author/producer field to Strapi -->
        <!-- @TODO: Verify if events feed is ASC by event start -->
        <EProductionCard
          :title="festival.title"
          :thumbnail="festival.thumbnail"
          :nextEvent="festival.nextEvent"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.Page {
  padding: var(--p-4);
}
</style>
