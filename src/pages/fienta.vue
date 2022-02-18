<template>
  <div class="fienta">
    <div>
      <ETitle size="lg">Validate your ticket</ETitle>
      <EContent>
        There is a <b>ticket code</b> in your Fienta email, just below the
        "Sisene üritusele / Enter event" blue button. Copy-paste it to the box
        below:
      </EContent>
      <Fienta client:only />
    </div>
  </div>
</template>

<style scoped>
.fienta {
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
}
.fienta > div {
  width: 50vw;
  display: grid;
  gap: var(--gap-4);
}
.fienta .EButton {
  justify-self: flex-start;
}
@media only screen and (max-width: 600px) {
  .fienta {
    align-content: flex-start;
  }
  .fienta > div {
    width: 100%;
  }
}
</style>
