export const useMapStore = defineStore('Map', () => {
  const currentMapArea = ref('Taipei')
  const currentAreaName = computed(() => {
    switch (currentMapArea.value) {
      case 'Taipei':
        return '臺北市'
      case 'NewTaipei':
        return '新北市'
      case 'Keelung':
        return '基隆市'
      case 'Taoyuan':
        return '桃園市'
      case 'HsinchuCounty':
        return '新竹縣'
      case 'HsinchuCity':
        return '新竹市'
      case 'Miaoli':
        return '苗栗縣'
      case 'Taichung':
        return '台中市'
      case 'Changhua':
        return '彰化縣'
      case 'Nantou':
        return '南投縣'
      case 'Yunlin':
        return '雲林縣'
      case 'ChiayiCounty':
        return '嘉義縣'
      case 'ChiayiCity':
        return '嘉義市'
      case 'Tainan':
        return '台南市'
      case 'Kaohsiung':
        return '高雄市'
      case 'Pingtung':
        return '屏東縣'
      case 'Yilan':
        return '宜蘭縣'
      case 'Hualien':
        return '花蓮縣'
      case 'Taitung':
        return '台東縣'
      case 'Penghu':
        return '澎湖縣'
      case 'Kinmen':
        return '金門縣'
      case 'Lienchiang':
        return '連江縣'
      default:
        return ''
    }
  })

  const weatherData = ref<any>()
  const weather = computed(() => {
    return weatherData.value.records.location
  })

  function getLocation(location: string | undefined) {
    if (!location) return undefined
    return weather.value.find((item: any) => item.locationName === location)
  }
  function getLocationWeatherCode(location: any) {
    if (!location) return undefined
    const codes = currnetLocation.value.weatherElement.find(
      (item: any) => item.elementName === 'Wx'
    )
    return codes.time
  }
  function getLocationRainPercent(location: any) {
    if (!location) return undefined
    const codes = currnetLocation.value.weatherElement.find(
      (item: any) => item.elementName === 'PoP'
    )
    return codes.time
  }
  function getLocationMinTemp(location: any) {
    if (!location) return undefined
    const codes = currnetLocation.value.weatherElement.find(
      (item: any) => item.elementName === 'MinT'
    )
    return codes.time
  }
  function getLocationMaxTemp(location: any) {
    if (!location) return undefined
    const codes = currnetLocation.value.weatherElement.find(
      (item: any) => item.elementName === 'MaxT'
    )
    return codes.time
  }
  function getLocationComfort(location: any) {
    if (!location) return undefined
    const codes = currnetLocation.value.weatherElement.find(
      (item: any) => item.elementName === 'CI'
    )
    return codes.time
  }

  const currnetLocation = ref<any>()
  const locationWeatherCode = ref()
  const locationRainPercent = ref()
  const locationMinTemp = ref()
  const locationMaxTemp = ref()
  const locationComfort = ref()

  onMounted(async () => {
    try {
      weatherData.value = await $fetch(
        'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-5A2506C9-9306-4857-8F19-D5455BFA4DE0'
      )
    } catch (error) {
      console.error('Failed to fetch weather data:', error)
    }
  })

  watchEffect(() => {
    if (weatherData.value) {
      const location = getLocation(currentAreaName.value)
      currnetLocation.value = location
    }
  })
  watchEffect(() => {
    if (currnetLocation.value) {
      const weatherCode = getLocationWeatherCode(currnetLocation.value)
      const rainPercent = getLocationRainPercent(currnetLocation.value)
      const minTemp = getLocationMinTemp(currnetLocation.value)
      const maxTemp = getLocationMaxTemp(currnetLocation.value)
      const comfort = getLocationComfort(currnetLocation.value)
      locationWeatherCode.value = weatherCode
      locationRainPercent.value = rainPercent
      locationMinTemp.value = minTemp
      locationMaxTemp.value = maxTemp
      locationComfort.value = comfort
    }
  })

  return {
    currentMapArea,
    currentAreaName,
    weatherData,
    weather,
    getLocation,
    currnetLocation,
    locationWeatherCode,
    locationRainPercent,
    locationMinTemp,
    locationMaxTemp,
    locationComfort
  }
})
