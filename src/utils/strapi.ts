import { formatDatetime } from "elektro";
import { $fetch } from "ohmyfetch";

// Events v3

// TODO add pager
export async function getEvents() {
  return $fetch("https://strapi.elektron.art/events_limit=-1");
}

// Festivals v3

function sortFestival(a: any, b: any) {
  return Number(b.pinned) - Number(a.pinned);
}

function filterFestival(festival: any) {
  return !["kohe2022", "signal"].includes(festival.slug);
}

function processFestival(festival: any) {
  festival.thumbnail = festival.images[0]?.url;
  festival.nextEvent = {
    startAt: festival.events[0]?.start_at
      ? formatDatetime(new Date(festival.events[0]?.start_at))
      : null,
    endAt: festival.events[0]?.end_at
      ? formatDatetime(new Date(festival.events[0]?.end_at))
      : null,
  };
  return festival;
}

export async function getFestivals() {
  // TODO use Strapi sorting
  return $fetch(
    "https://strapi.elektron.art/festivals?_sort=created_at:DESC&_limit=-1"
  ).then((f) =>
    f.filter(filterFestival).sort(sortFestival).map(processFestival)
  );
}

// Main festival v3

export async function getMainFestival() {
  return await $fetch(
    "https://strapi.elektron.art/festivals?slug=kohe2022"
  ).then((f) => f.map(processFestival)[0]);
}

// Podcasts v3

export async function getPodcast() {
  return await $fetch("https://strapi.elektron.art/festivals?slug=signal").then(
    (f) => f.map(processFestival)[0]
  );
}
