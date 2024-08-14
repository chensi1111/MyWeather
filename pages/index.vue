<template>
  <div class="relative flex overflow-hidden bg-sky-300">
    <TaiwanMap></TaiwanMap>
    <WeatherBox></WeatherBox>
    <div class="cloud cloud1" />
    <div class="cloud cloud2" />
    <div class="cloud cloud3" />
  </div>
</template>
<style scoped lang="sass">
.cloud
  position: absolute
  top: 0
  left: 0
  width: 300%
  height: 100%

  &.cloud1
    background-image: url(../assets/cloud1.png)
    background-position: bottom
    opacity: 0.5
    z-index: 3
    animation: cloud 100s linear infinite

  &.cloud2
    background-image: url(../assets/cloud3.png)
    background-position: top
    opacity: 0.8
    z-index: 2
    animation: cloud 150s linear infinite

  &.cloud3
    background-image: url(../assets/cloud2.png)
    background-position: center
    opacity: 0.8
    z-index: 1
    animation: cloud 200s linear infinite

@keyframes cloud
  from
    left: 0
  to
    left: -200%
</style>
