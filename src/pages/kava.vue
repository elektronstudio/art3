<script setup lang="ts">
import { getUpcomingFestivals, formatMarkdown } from "../utils";

const upcomingFestivals = await getUpcomingFestivals();
</script>

<template>
  <EStack class="Page">
    <template v-for="festival in upcomingFestivals">
      <ETitle size="lg" v-html="festival.title" />
      <template v-for="event in festival.upcomingEvents">
        <ETitle v-html="event.title" />
        <Test client:load>{{ event.formattedDistance }}</Test>
        <Test client:load>{{ event.urgency }}</Test>
      </template>
    </template>
  </EStack>
</template>

<style scoped>
.Page {
  padding: var(--p-5);
}
</style>
