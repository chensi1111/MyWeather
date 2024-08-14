<template>
  <div class="w-full px-2 pt-1">
    <div class="mt-4 text-xl font-bold md:text-3xl">
      <i class="fa-solid fa-cloud-sun mr-2"></i>全臺天氣預報
    </div>
    <div class="mt-3 flex items-center justify-between">
      <div class="hidden md:flex">
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/week/default">一周預報</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/week/AT">體感溫度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/week/CI">舒適度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/week/RH">相對溼度</NuxtLink></div>
        <div class="mr-5 text-xl font-bold"><NuxtLink to="/week/UVI">紫外線</NuxtLink></div>
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
  { name: '一周預報', path: '/week/default' },
  { name: '體感溫度', path: '/week/AT' },
  { name: '紫外線', path: '/week/UVI' },
  { name: '舒適度', path: '/week/CI' },
  { name: '相對溼度', path: '/week/RH' }
])
const nav = ref(currentPath.value)

// 標題
const pathTitle = computed(() => {
  switch (currentPath.value) {
    case '/week/default':
      return '一周預報'
    case '/week/AT':
      return '體感溫度'
    case '/week/UVI':
      return '紫外線'
    case '/week/CI':
      return '舒適度'
    case '/week/RH':
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
    path: '/week/default'
  })
}
</script>

<style></style>
