<template>
  <div class="m-auto w-full pb-2 lg:px-4">
    <WeeKHeader></WeeKHeader>
    <div class="hidden md:block">
      <div class="mt-10 flex w-full justify-around">
        <div
          v-for="item in location"
          :key="item.id"
          class="w-full cursor-pointer border-b-2 border-solid border-sky-800 py-2 text-center text-2xl font-bold hover:bg-sky-800 hover:text-white"
          :class="{ 'bg-sky-800 text-white': filter === item.location }"
          @click="changeLocation(item.location)"
        >
          {{ item.id }}
        </div>
      </div>
      <div class="sticky top-0 mt-3 flex bg-white">
        <div class="flex bg-sky-800 text-white">
          <div class="bodr-solid-white w-16 border py-2 text-center text-xl font-bold lg:w-28">
            縣市
          </div>
          <div class="bodr-solid-white w-16 border py-2 text-center text-xl font-bold lg:w-24">
            時間
          </div>
        </div>
        <div class="flex w-full justify-around">
          <div v-for="item in weekDataStore.filteredDayData('臺北市')" :key="item.startTime">
            <div class="flex items-center justify-center text-lg font-bold lg:text-xl">
              {{ formatDate(item.startTime)[0] }}
            </div>
            <div class="flex items-center justify-center text-base font-bold lg:text-base">
              {{ formatDate(item.startTime)[1] }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="city in filteCitys" :key="city.name" class="flex">
          <div
            class="bodr-solid-white flex w-16 items-center justify-center border bg-sky-600 text-lg font-bold text-white lg:w-28 lg:text-xl"
          >
            {{ city.name }}
          </div>
          <div class="w-[calc(100%-64px)] lg:w-[calc(100%-112px)]">
            <div class="flex border">
              <div
                class="bodr-solid-white flex w-16 items-center justify-center border bg-sky-800 text-lg font-bold text-white lg:w-24"
              >
                白天
              </div>
              <div
                class="flex w-[calc(100%-64px)] justify-around bg-yellow-50 py-2 lg:w-[calc(100%-96px)]"
              >
                <div v-for="item in weekDataStore.filteredDayData(city.name)" :key="item.startTime">
                  <img
                    v-if="$route.params.id !== 'UVI'"
                    :src="getImageUrl('day', `${Number(item.wxUnit)}.svg`)"
                    :title="item.wxValue"
                    class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                  />
                  <img
                    v-if="$route.params.id === 'UVI'"
                    :src="getImageUrl('UVI', `${Number(item.UVINumber)}.png`)"
                    class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                  />
                  <div v-if="$route.params.id === 'default'" class="flex">
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minTValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxTValue }} °C
                    </div>
                  </div>
                  <div v-if="$route.params.id === 'AT'" class="flex">
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minATValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxATValue }} °C
                    </div>
                  </div>
                  <div v-if="$route.params.id === 'CI'" class="flex">
                    <div class="w-10 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minCIValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-10 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxCIValue }}
                    </div>
                  </div>
                  <div
                    v-if="$route.params.id === 'RH'"
                    class="w-8 text-center text-xs lg:w-12 lg:text-base"
                  >
                    {{ item.RHValue }}%
                  </div>
                  <div
                    v-if="$route.params.id === 'UVI'"
                    class="w-10 text-center text-xs lg:w-12 lg:text-base"
                  >
                    {{ item.UVIValue }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$route.params.id !== 'UVI'" class="flex">
              <div
                class="bodr-solid-white flex w-16 items-center justify-center border bg-sky-800 text-lg font-bold text-white lg:w-24"
              >
                晚上
              </div>
              <div
                class="flex w-[calc(100%-64px)] justify-around bg-white py-2 lg:w-[calc(100%-96px)]"
              >
                <div
                  v-for="item in weekDataStore.filteredNightData(city.name)"
                  :key="item.startTime"
                >
                  <img
                    :src="getImageUrl('night', `${Number(item.wxUnit)}.svg`)"
                    :title="item.wxValue"
                    class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                  />
                  <div v-if="$route.params.id === 'default'" class="flex">
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minTValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxTValue }} °C
                    </div>
                  </div>
                  <div v-if="$route.params.id === 'AT'" class="flex">
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minATValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-8 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxATValue }} °C
                    </div>
                  </div>
                  <div v-if="$route.params.id === 'CI'" class="flex">
                    <div class="w-10 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.minCIValue }}
                    </div>
                    <div class="text-xs">~</div>
                    <div class="w-10 text-center text-xs lg:w-12 lg:text-base">
                      {{ item.maxCIValue }}
                    </div>
                  </div>
                  <div
                    v-if="$route.params.id === 'RH'"
                    class="w-8 text-center text-xs lg:w-12 lg:text-base"
                  >
                    {{ item.RHValue }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:hidden">
      <div class="my-4 flex flex-wrap px-2">
        <div
          v-for="item in location"
          :key="item.id"
          class="w-1/3 cursor-pointer border-b-2 border-solid border-sky-800 py-2 text-center text-2xl font-bold hover:bg-sky-800 hover:text-white"
          :class="{ activated: filter === item.location }"
          @click="changeLocation(item.location)"
        >
          {{ item.id }}
        </div>
      </div>
      <div v-for="city in filteCitys" :key="city.name">
        <button
          :id="`hs-basic-collapse-${city.name}`"
          type="button"
          class="hs-collapse-toggle mx-2 mb-2 box-border inline-flex w-[calc(100%-16px)] items-center gap-x-2 border border-transparent bg-sky-800 px-4 py-3 text-sm font-medium text-white hover:bg-sky-500 focus:bg-sky-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-expanded="false"
          :aria-controls="`hs-basic-collapse-heading-${city.name}`"
          :data-hs-collapse="`#hs-basic-collapse-heading-${city.name}`"
        >
          {{ city.name }}
          <svg
            class="size-4 shrink-0 text-white hs-collapse-open:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div
          :id="`hs-basic-collapse-heading-${city.name}`"
          class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
          :aria-labelledby="`hs-basic-collapse-${city.name}`"
        >
          <div class="mx-2 mt-2">
            <div class="flex">
              <div class="w-1/3">
                <div class="mb-2 bg-sky-800 py-1 text-center text-lg text-white">日期</div>
                <div
                  v-for="item in weekDataStore.filteredDayData('臺北市')"
                  :key="item.startTime"
                  class="mb-2"
                >
                  <div class="flex h-6 items-center justify-center text-lg font-bold lg:text-xl">
                    {{ formatDate(item.startTime)[0] }}
                  </div>
                  <div
                    class="flex h-6 items-center justify-center text-base font-bold lg:text-base"
                  >
                    {{ formatDate(item.startTime)[1] }}
                  </div>
                </div>
              </div>
              <div class="w-1/3">
                <div class="mb-2 bg-sky-800 py-1 text-center text-lg text-white">白天</div>
                <div>
                  <div
                    v-for="item in weekDataStore.filteredDayData(city.name)"
                    :key="item.startTime"
                  >
                    <img
                      v-if="$route.params.id !== 'UVI'"
                      :src="getImageUrl('day', `${Number(item.wxUnit)}.svg`)"
                      :title="item.wxValue"
                      class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                    />
                    <img
                      v-if="$route.params.id === 'UVI'"
                      :src="getImageUrl('UVI', `${Number(item.UVINumber)}.png`)"
                      class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                    />
                    <div v-if="$route.params.id === 'default'" class="flex justify-center">
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minTValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxTValue }} °C
                      </div>
                    </div>
                    <div v-if="$route.params.id === 'AT'" class="flex justify-center">
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minATValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxATValue }} °C
                      </div>
                    </div>
                    <div v-if="$route.params.id === 'CI'" class="flex justify-center">
                      <div class="h-6 w-10 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minCIValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-10 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxCIValue }}
                      </div>
                    </div>
                    <div
                      v-if="$route.params.id === 'RH'"
                      class="m-auto h-6 w-8 text-center text-xs lg:w-12 lg:text-base"
                    >
                      {{ item.RHValue }}%
                    </div>
                    <div
                      v-if="$route.params.id === 'UVI'"
                      class="m-auto h-6 w-10 text-center text-xs lg:w-12 lg:text-base"
                    >
                      {{ item.UVIValue }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-1/3">
                <div class="mb-2 bg-sky-800 py-1 text-center text-lg text-white">晚上</div>
                <div>
                  <div
                    v-for="item in weekDataStore.filteredDayData(city.name)"
                    :key="item.startTime"
                  >
                    <img
                      v-if="$route.params.id !== 'UVI'"
                      :src="getImageUrl('night', `${Number(item.wxUnit)}.svg`)"
                      :title="item.wxValue"
                      class="m-auto h-8 w-8 lg:h-10 lg:w-10"
                    />
                    <div v-if="$route.params.id === 'default'" class="flex justify-center">
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minTValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxTValue }} °C
                      </div>
                    </div>
                    <div v-if="$route.params.id === 'AT'" class="flex justify-center">
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minATValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-8 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxATValue }} °C
                      </div>
                    </div>
                    <div v-if="$route.params.id === 'CI'" class="flex justify-center">
                      <div class="h-6 w-10 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.minCIValue }}
                      </div>
                      <div class="text-xs">~</div>
                      <div class="h-6 w-10 text-center text-xs lg:w-12 lg:text-base">
                        {{ item.maxCIValue }}
                      </div>
                    </div>
                    <div
                      v-if="$route.params.id === 'RH'"
                      class="m-auto h-6 w-8 text-center text-xs lg:w-12 lg:text-base"
                    >
                      {{ item.RHValue }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const weekDataStore = useWeekDataStore()
// 地區
const location = ref([
  { id: '全台', location: 'full' },
  { id: '北部', location: 'north' },
  { id: '中部', location: 'mid' },
  { id: '南部', location: 'south' },
  { id: '東部', location: 'east' },
  { id: '外島', location: 'outside' }
])
// 縣市
const citys = ref([
  { name: '基隆市', type: 'north' },
  { name: '臺北市', type: 'north' },
  { name: '新北市', type: 'north' },
  { name: '桃園市', type: 'north' },
  { name: '新竹縣', type: 'north' },
  { name: '新竹市', type: 'north' },
  { name: '苗栗縣', type: 'north' },
  { name: '臺中市', type: 'mid' },
  { name: '彰化縣', type: 'mid' },
  { name: '雲林縣', type: 'mid' },
  { name: '南投縣', type: 'mid' },
  { name: '嘉義縣', type: 'mid' },
  { name: '嘉義市', type: 'mid' },
  { name: '臺南市', type: 'south' },
  { name: '高雄市', type: 'south' },
  { name: '屏東縣', type: 'south' },
  { name: '宜蘭縣', type: 'east' },
  { name: '花蓮縣', type: 'east' },
  { name: '臺東縣', type: 'east' },
  { name: '澎湖縣', type: 'outside' },
  { name: '金門縣', type: 'outside' },
  { name: '連江縣', type: 'outside' }
])

// 篩選地區
function changeLocation(location: string) {
  filter.value = location
}
const filter = ref('full')
const filteCitys = computed(() => {
  if (filter.value === 'full') {
    return citys.value
  } else {
    return citys.value.filter((city: { type: string }) => city.type === filter.value)
  }
})

const { getImageUrl } = useAssets()
// 格式化日期
function formatDate(time: string): [string, string] {
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  const [year, month, day] = time.split(' ')[0].split('-')
  const date = new Date(`${year}-${month}-${day}`)
  const dayOfWeek = daysOfWeek[date.getDay()]

  return [`${month}-${day}`, dayOfWeek]
}

watch(filteCitys, async () => {
  await nextTick()
  // 重新初始化 preline 插件
  if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit()
  }
})
</script>
