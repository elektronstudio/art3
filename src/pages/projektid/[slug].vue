<script lang="ts">
import { getFestivals } from "../../utils";
export default definePageComponent({
  async getStaticPaths() {
    const festivals = await getFestivals();
    return festivals.map((festival: any) => ({
      params: { slug: festival.slug },
      props: { festival },
    }));
  },
});
</script>

<script setup lang="ts">
type Props = {
  festival: any;
};

const { festival } = defineProps<Props>();
</script>

<template>
  <article class="Page">
    <header>
      <ETitle el="h1" size="lg" :title="festival.title" />
    </header>
  </article>
</template>

<style scoped>
.Page {
  padding: var(--p-5);
}
</style>
