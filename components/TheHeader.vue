<template>
  <div class="items-center bg-sky-400 pl-4 phone:flex lg:px-16">
    <img src="../assets/logo.png" class="mr-2 h-24" />
    <div class="flex pb-4 phone:pb-0">
      <div
        class="mr-5 text-xl font-bold text-white hover:cursor-pointer hover:text-black lg:text-2xl"
      >
        <NuxtLink to="/">首頁</NuxtLink>
      </div>
      <div class="text-xl font-bold text-white hover:cursor-pointer hover:text-black lg:text-2xl">
        <NuxtLink to="/week/default">全臺天氣預報</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped></style>
