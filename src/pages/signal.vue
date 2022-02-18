<script setup lang="ts">
import { $fetch } from "ohmyfetch";
import Parser from "rss-parser/dist/rss-parser.js";

import { getPodcast, formatMarkdown } from "../utils";

// TODO move to /logic and use env variable

const podcast = await getPodcast();

// TODO: use env variable(s)
const rssUrl =
  "https://api.allorigins.win/get?url=https://elektronsignal.captivate.fm/rssfeed";

let parser = new Parser();
const rssSource: any = await $fetch(rssUrl);
const rss = await parser.parseString(rssSource.contents);
</script>

<template>
  <div class="signal">
    <!-- TODO: Remove style when elektro gets updated -->
    <EStack style="grid-auto-rows: min-content">
      <ETitle size="lg">Elektron Signal</ETitle>
      <!-- TODO: Add susbcribe buttons -->
      <!-- https://github.com/elektronstudio/art/blob/master/src/pages/Signal.vue#L36 -->
      <EContent v-html="formatMarkdown(podcast[0].description_estonian)" />
      <EContent v-html="formatMarkdown(podcast[0].description_english)" />
    </EStack>
    <EStack>
      <ETitle>Latest episodes</ETitle>
      <EStack v-for="(episode, i) in rss.items" :key="i">
        <ETitle v-html="episode.title" />
        <EContent v-html="episode['content:encoded']" />
        <audio controls :src="episode?.enclosure.url" />
      </EStack>
    </EStack>
  </div>
</template>

<style scoped>
.signal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-5);
  padding: var(--gap-5);
  grid-auto-rows: auto;
}
/* @TODO: Add breakpoints system */
@media only screen and (max-width: 800px) {
  .signal {
    grid-template-columns: 1fr;
  }
}
</style>
