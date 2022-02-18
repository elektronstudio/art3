<script setup lang="ts">
import { ref } from "vue";
import IconMenu from "~icons/radix-icons/hamburger-menu";

import Nav from "./Nav.vue";

const navItems = [
  {
    name: "Kava",
    path: "/kava",
  },
  {
    name: "Projektid",
    path: "/projektid",
  },
  {
    name: "Meist",
    path: "/meist",
  },
  {
    name: "Signal podcast",
    path: "/signal",
  },

  // {
  //   name: "ENG",
  //   path: "/en",
  // },
];

const navState = ref(false);
</script>

<template>
  <header class="Header">
    <a href="/" class="homeButton">
      <ELogo el="span" />
    </a>
    <Nav :class="{ navActive: navState }" :nav-items="navItems" />
    <!-- <ELiveButton /> -->
    <button class="toggleNav" @click="navState = !navState">
      <IconMenu style="fill: var(--gray-500)" />
    </button>
  </header>
</template>

<style scoped>
.Header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--h-9);
  border: var(--border-DEFAULT) solid var(--gray-500);
  background-color: var(--bg);
}
.homeButton {
  display: inline-block;
  color: var(--gray-300);
  padding: var(--p-1) var(--p-3);
}
.toggleNav {
  padding: var(--p-3);
}
.toggleNav svg {
  fill: var(--gray-300);
}
/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .Nav.navActive {
    display: flex;
  }
}
@media only screen and (max-width: 999px) {
  .Nav {
    display: none;
  }
  .Nav.navActive {
    display: grid;
    position: fixed;
    top: var(--h-9);
    width: 100%;
    margin-top: calc(var(--border-DEFAULT) * -1);
    z-index: 100;
  }
}
@media only screen and (min-width: 600px) {
  .homeButton {
    min-width: 8rem;
  }
}
@media only screen and (min-width: 1000px) {
  .Header {
    display: flex;
  }
  .Nav {
    flex-grow: 1;
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
  .homeButton {
    min-width: 10rem;
  }
  .toggleNav {
    display: none;
  }
}
</style>
