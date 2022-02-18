<template>
  <div class="Page">
    <ETitle size="lg" class="about">
      Transdistsiplinaarne etenduskunsti platvorm,<br />mis liidab kaasaegse
      kunsti, teaduse ja<br />tehnloogia otsingulisi tegevusi
    </ETitle>
    <video
      class="video"
      src="https://fra1.digitaloceanspaces.com/elektron/strapi/360a11d9f1f67714207c413e56b6e711.mp4"
      muted
      autoplay
      loop
    />
  </div>
</template>

<style scoped>
.Page {
  position: relative;
}
.about {
  position: absolute;
  top: var(--p-5);
  left: var(--p-5);
}
.video {
  width: 100%;
  opacity: 0.25;
}
</style>
