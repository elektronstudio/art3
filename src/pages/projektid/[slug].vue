<script lang="ts">
export default definePageComponent({
  async getStaticPaths() {
    const festivals = await getFestivals();
    return festivals.map((festival: any) => ({
      params: { slug: festival.slug },
      props: { festival },
    }));
  },
});

// @TODO: Should these functions be in Elektro? Currently in two files.
</script>

<script setup lang="ts">
import { formatDatetime, useRange } from "elektro";
import { getFestivals, formatMarkdown } from "../../utils";

type Props = {
  festival: any;
};

const { festival } = defineProps<Props>();

const images = festival.images.map((image: any) => ({
  sizes: Object.values(image.formats),
  alt: image.alternativeText,
  caption: image.caption,
}));

const isUpcoming = (start_at: string, end_at: string) => {
  const { urgency } = useRange(new Date(start_at), new Date(end_at));
  return urgency.value === "future";
};

const upcomingEvents = (events: any[]) => {
  return events.filter(
    ({ start_at, end_at }: { start_at: string; end_at: string }) =>
      isUpcoming(start_at, end_at)
  );
};
</script>

<template>
  <article class="Page SingleProduction">
    <header>
      <ETitle el="h1" size="lg" :title="festival.title" />
      <!-- @TODO: Add author/producer field to Strapi -->
      <!-- <h4>{{ producer }}</h4> -->

      <!-- @TODO: Add locale based conditionals -->
      <!-- @TODO: Add short description -->
      <!-- <EContent
        v-if="festival.description_estonian"
        :content="formatMarkdown(festival.description_estonian)"
      /> -->
      <!-- <EContent
      v-if="festival.description_english"
      :content="formatMarkdown(festival.description_english)"
    /> -->
    </header>
    <EImageSlider :images="images" />
    <main>
      <EBox class="MainContent">
        <!-- @TODO: Add metadata -->
        <EDetailsList :details="[{ detail: 'Detail', value: 'Value' }]" />
        <EContent :content="formatMarkdown(festival.description_estonian)" />
      </EBox>
      <EBox
        v-if="upcomingEvents(festival.events).length > 0 || festival.press"
        class="SideContent"
        el="aside"
      >
        <template v-if="upcomingEvents(festival.events).length > 0">
          <ETitle el="h3" size="lg">Etendused</ETitle>
          <template v-for="event in festival.events">
            <EEventInstance
              client:only
              v-if="isUpcoming(event.start_at, event.end_at)"
              :start-at="formatDatetime(new Date(event.start_at))"
              :end-at="formatDatetime(new Date(event.end_at))"
              layout="vertical"
              :ticket-url="event.ticketUrl"
            />
          </template>
        </template>
        <!-- @TODO: Add press -->
        <!-- <template v-if="press">
          <ETitle el="h3" size="lg">Press</ETitle>
          <EPressItems :items="press" />
        </template> -->
      </EBox>
    </main>
  </article>
</template>

<style scoped>
.Page.SingleProduction header,
.Page.SingleProduction main {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: var(--p-4);
  color: var(--gray-300);
}

.Page.SingleProduction header {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}
.Page.SingleProduction main {
  grid-template-areas:
    "main"
    "side";
}

.Page.SingleProduction header h1 {
  grid-area: title;
}

.Page.SingleProduction header h4 {
  grid-area: subtitle;
  align-self: end;
}

.Page.SingleProduction header .Description {
  grid-area: description;
}

.MainContent {
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
}
.SideContent {
  grid-area: side;
  align-self: start;
}
.SideContent h3 {
  margin-bottom: var(--m-6);
}
.SideContent h3:not(:first-child) {
  margin-top: var(--m-8);
}

/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(4, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title description description description"
      "subtitle description description description";
  }

  .Page.SingleProduction main {
    grid-template-areas: "main main main main" "side side side side";
  }
  .MainContent {
    grid-template-columns: 2fr 3fr;
  }
}
@media only screen and (min-width: 1240px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(8, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title title description description description description . ."
      "subtitle subtitle description description description description . .";
  }
  .Page.SingleProduction main {
    grid-template-areas: "main main main main main side side side";
  }
}
</style>
