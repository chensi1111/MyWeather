<template>
  <div class="z-50 min-h-screen w-full p-5 lg:w-1/2">
    <div class="h-80 w-full sm:flex md:justify-around lg:justify-normal">
      <div
        class="mb-4 mr-2 box-border flex h-full w-full rounded-lg border border-solid border-black bg-sky-500 p-2 sm:w-1/2"
      >
        <div class="w-1/2">
          <div class="flex flex-wrap items-center">
            <div class="mr-3 text-xl font-bold text-white sm:text-2xl">
              {{ mapStore.currentAreaName }}
            </div>
            <div class="text-xl font-bold text-white">{{ formattedDate }}</div>
          </div>
          <select v-if="weatherCodes" v-model="city" name="city" class="mt-4 w-full rounded-md">
            <option v-for="item in cityOption" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <div
            class="my-3 cursor-pointer rounded-md border border-solid border-black bg-sky-300 py-1 text-center text-xs font-bold hover:bg-sky-100 sm:text-sm"
          >
            <NuxtLink to="/week">查看全臺天氣</NuxtLink>
          </div>
        </div>
        <div class="w-full sm:w-1/2">
          <div v-if="weatherCodes" class="w-full text-center text-xl font-bold text-white">
            {{ getWeatherTitle[0] }}
          </div>
          <div
            v-if="weatherCodes"
            class="w-full text-center text-lg font-bold text-white lg:text-base"
          >
            {{ formatTime(weatherCodes[0].startTime) }}~{{ formatTime(weatherCodes[0].endTime) }}
          </div>
          <div class="my-2 flex justify-center">
            <img
              v-if="weatherCodes"
              :src="getWeatherIcon(showDayOrNight(0), weatherCodes[0].parameter.parameterValue)"
              class="h-16"
            />
          </div>
          <div
            v-if="weatherCodes"
            class="h-10 text-center text-xs font-bold text-white phone:text-sm"
          >
            {{ weatherCodes[0].parameter.parameterName }}
          </div>
          <div v-if="rainPerent" class="my-1 text-center text-base font-bold">
            <i class="fa-solid fa-umbrella mr-1"></i>{{ rainPerent[0].parameter.parameterName }}%
          </div>
          <div v-if="minTemp && maxTemp" class="text-center text-xl font-bold text-white">
            {{ minTemp[0].parameter.parameterName }}°~{{ maxTemp[0].parameter.parameterName }}°
          </div>
          <div v-if="comfort" class="mt-3 text-center text-lg font-bold">
            {{ comfort[0].parameter.parameterName }}
          </div>
        </div>
      </div>
      <div class="flex w-full sm:w-1/2">
        <div
          class="mr-2 box-border h-full w-1/2 rounded-lg border border-solid border-black bg-sky-500 p-2"
        >
          <div v-if="weatherCodes" class="w-full text-center text-xl font-bold text-white">
            {{ getWeatherTitle[1] }}
          </div>
          <div
            v-if="weatherCodes"
            class="w-full text-center text-lg font-bold text-white lg:text-base"
          >
            {{ formatTime(weatherCodes[1].startTime) }}~{{ formatTime(weatherCodes[1].endTime) }}
          </div>
          <div class="my-2 flex justify-center">
            <img
              v-if="weatherCodes"
              :src="getWeatherIcon(showDayOrNight(1), weatherCodes[1].parameter.parameterValue)"
              class="h-16"
            />
          </div>
          <div
            v-if="weatherCodes"
            class="h-10 text-center text-xs font-bold text-white phone:text-sm"
          >
            {{ weatherCodes[1].parameter.parameterName }}
          </div>
          <div v-if="rainPerent" class="my-1 text-center text-base font-bold">
            <i class="fa-solid fa-umbrella mr-1"></i>{{ rainPerent[1].parameter.parameterName }}%
          </div>
          <div v-if="minTemp && maxTemp" class="text-center text-xl font-bold text-white">
            {{ minTemp[1].parameter.parameterName }}°~{{ maxTemp[1].parameter.parameterName }}°
          </div>
          <div v-if="comfort" class="mt-3 text-center text-lg font-bold">
            {{ comfort[1].parameter.parameterName }}
          </div>
        </div>
        <div
          class="box-border h-full w-1/2 rounded-lg border border-solid border-black bg-sky-500 p-2"
        >
          <div v-if="weatherCodes" class="w-full text-center text-xl font-bold text-white">
            {{ getWeatherTitle[2] }}
          </div>
          <div
            v-if="weatherCodes"
            class="w-full text-center text-lg font-bold text-white lg:text-base"
          >
            {{ formatTime(weatherCodes[2].startTime) }}~{{ formatTime(weatherCodes[2].endTime) }}
          </div>
          <div class="my-2 flex justify-center">
            <img
              v-if="weatherCodes"
              :src="getWeatherIcon(showDayOrNight(2), weatherCodes[2].parameter.parameterValue)"
              class="h-16"
            />
          </div>
          <div
            v-if="weatherCodes"
            class="h-10 text-center text-xs font-bold text-white phone:text-sm"
          >
            {{ weatherCodes[2].parameter.parameterName }}
          </div>
          <div v-if="rainPerent" class="my-1 text-center text-base font-bold">
            <i class="fa-solid fa-umbrella mr-1"></i>{{ rainPerent[2].parameter.parameterName }}%
          </div>
          <div v-if="minTemp && maxTemp" class="text-center text-xl font-bold text-white">
            {{ minTemp[2].parameter.parameterName }}°~{{ maxTemp[2].parameter.parameterName }}°
          </div>
          <div v-if="comfort" class="mt-3 text-center text-lg font-bold">
            {{ comfort[2].parameter.parameterName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const mapStore = useMapStore()
const today = new Date()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')
const formattedDate = `${month}/${day}`
const weatherCodes = ref()
const rainPerent = ref()
const minTemp = ref()
const maxTemp = ref()
const comfort = ref()
const city = ref('Taipei')
const cityOption = ref([
  { name: '基隆市', id: 'Keelung' },
  { name: '臺北市', id: 'Taipei' },
  { name: '新北市', id: 'NewTaipei' },
  { name: '桃園市', id: 'Taoyuan' },
  { name: '新竹縣', id: 'HsinchuCounty' },
  { name: '新竹市', id: 'HsinchuCity' },
  { name: '苗栗縣', id: 'Miaoli' },
  { name: '台中市', id: 'Taichung' },
  { name: '彰化縣', id: 'Changhua' },
  { name: '雲林縣', id: 'Yunlin' },
  { name: '南投縣', id: 'Nantou' },
  { name: '嘉義縣', id: 'ChiayiCounty' },
  { name: '嘉義市', id: 'ChiayiCity' },
  { name: '台南市', id: 'Tainan' },
  { name: '高雄市', id: 'Kaohsiung' },
  { name: '屏東縣', id: 'Pingtung' },
  { name: '宜蘭縣', id: 'Yilan' },
  { name: '花蓮縣', id: 'Hualien' },
  { name: '台東縣', id: 'Taitung' },
  { name: '澎湖縣', id: 'Penghu' },
  { name: '金門縣', id: 'Kinmen' },
  { name: '連江縣', id: 'Lienchiang' }
])

function showDayOrNight(number: number) {
  if (formatTime(weatherCodes.value[number].startTime) === '18:00') {
    return 'night'
  } else {
    return 'day'
  }
}

function getWeatherIcon(day: string, code: number): string {
  const number = Number(code)
  if (day === 'day') {
    return new URL(`../assets/day/${number}.svg`, import.meta.url).href
  } else {
    return new URL(`../assets/night/${number}.svg`, import.meta.url).href
  }
}

function formatTime(dateTime: string) {
  const date = new Date(dateTime)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const getWeatherTitle = computed(() => {
  if (formatTime(weatherCodes.value[0].startTime) === '12:00') {
    return ['今日白天', '今晚明晨', '明日白天']
  } else if (formatTime(weatherCodes.value[0].startTime) === '18:00') {
    return ['今晚明晨', '明日白天', '明日晚上']
  } else if (formatTime(weatherCodes.value[0].startTime) === '6:00') {
    return ['今日白天', '今晚明晨', '明日白天']
  } else {
    return ['今日凌晨', '今日白天', '今日晚上']
  }
})
watchEffect(() => {
  weatherCodes.value = mapStore.locationWeatherCode
  rainPerent.value = mapStore.locationRainPercent
  minTemp.value = mapStore.locationMinTemp
  maxTemp.value = mapStore.locationMaxTemp
  comfort.value = mapStore.locationComfort
  city.value = mapStore.currentMapArea
})
watch(city, (newCity: string) => {
  mapStore.currentMapArea = newCity
})
</script>
