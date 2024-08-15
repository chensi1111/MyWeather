<template>
  <div class="w-full px-2 pt-1">
    <div class="mt-4 text-xl font-bold md:text-3xl">
      <i class="fa-solid fa-cloud-sun mr-2"></i>全臺天氣預報
    </div>
    <div class="mt-3 flex items-center justify-between">
      <div class="hidden md:flex">
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/default">一周預報</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/AT">體感溫度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/CI">舒適度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/RH">相對溼度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/UVI">紫外線</NuxtLink></div>
      </div>
      <select v-model="nav" class="border-2 border-black px-1 py-[2px] text-base md:hidden">
        <option v-for="item in navs" :key="item.name" :value="item.path">{{ item.name }}</option>
      </select>
      <div class="flex text-xs phone:text-sm md:text-base">
        <div @click="toHome"><i class="fa-solid fa-house cursor-pointer"></i></div>
        <div>
          <span class="mx-1 phone:mx-2">/</span>
          <span class="cursor-pointer" @click="toWeek">一周預報</span>
        </div>
        <div v-if="pathTitle && pathTitle !== '一周預報'">
          <span class="mx-1 phone:mx-2">/</span>{{ pathTitle }}
        </div>
      </div>
    </div>
    <div class="m-auto mt-4 w-fit text-2xl font-bold md:text-3xl">{{ pathTitle }}</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const currentPath = ref(route.path)
// RWD選項
const navs = ref([
  { name: '一周預報', path: '/default' },
  { name: '體感溫度', path: '/AT' },
  { name: '紫外線', path: '/UVI' },
  { name: '舒適度', path: '/CI' },
  { name: '相對溼度', path: '/RH' }
])
const nav = ref(currentPath.value)

// 標題
const pathTitle = computed(() => {
  switch (currentPath.value) {
    case '/default':
      return '一周預報'
    case '/AT':
      return '體感溫度'
    case '/UVI':
      return '紫外線'
    case '/CI':
      return '舒適度'
    case '/RH':
      return '相對溼度'
    default:
      return ''
  }
})

// 路由
watch(
  () => route.path,
  (newPath: string) => {
    currentPath.value = newPath
  }
)
watch(nav, (newPath: string) => {
  router.push({
    path: newPath
  })
})

function toHome() {
  router.push({
    path: '/'
  })
}
function toWeek() {
  router.push({
    path: '/default'
  })
}
useHead({
  meta: [
    { name: 'description', content: `${pathTitle.value} | 氣象小幫手` },
    { name: 'keywords', content: `${pathTitle.value}` },
    { property: 'og:title', content: `${pathTitle.value} | 氣象小幫手` },
    { property: 'og:description', content: pathTitle.value },
    { property: 'og:image', content: pathTitle.value }
  ],
  title: `${pathTitle.value} | 氣象小幫手`
})
</script>
