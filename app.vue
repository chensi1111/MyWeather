<template>
  <div>
    <TheHeader></TheHeader>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'og:title', content: `氣象小幫手` },
    {
      name: 'description',
      content: `使用 Nuxt3所打造的氣象查詢網站，串接中央氣象局API，以Vite建立開發環境，使用TypeScript撰寫，TailwindCSS樣式，Pinia狀態管理。`
    }
  ],
  title: `氣象小幫手MyWeather`
})
</script>
