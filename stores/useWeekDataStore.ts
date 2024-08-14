export const useWeekDataStore = defineStore('WeekData', () => {
  interface WeatherData {
    startTime: string
    endTime: string
    wxValue?: string
    wxUnit?: string
    minTValue?: string
    maxTValue?: string
    minATValue?: string
    maxATValue?: string
    RHValue?: string
    minCIValue?: string
    maxCIValue?: string
    UVIValue?: string
    UVINumber?: string
  }

  const weatherData = ref()
  const weather = computed(() => {
    return weatherData.value?.records?.locations[0]?.location || []
  })

  const combinedData = ref<any[]>([])

  const updateCombinedData = () => {
    combinedData.value = weather.value.map(
      (location: { weatherElement: any[]; locationName: any }) => {
        const wxElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'Wx'
        )
        const minTElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MinT'
        )
        const maxTElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MaxT'
        )
        const UVIElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'UVI'
        )
        const minATElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MinAT'
        )
        const maxATElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MaxAT'
        )
        const minCIElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MinCI'
        )
        const maxCIElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'MaxCI'
        )
        const RHElement = location.weatherElement.find(
          (el: { elementName: string }) => el.elementName === 'RH'
        )

        const wxData = wxElement
          ? wxElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                wxValue: t.elementValue[0].value,
                wxUnit: t.elementValue[1] ? t.elementValue[1].value : null
              })
            )
          : []

        const minTData = minTElement
          ? minTElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                minTValue: t.elementValue[0].value
              })
            )
          : []

        const maxTData = maxTElement
          ? maxTElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                maxTValue: t.elementValue[0].value
              })
            )
          : []

        const minATData = minATElement
          ? minATElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                minATValue: t.elementValue[0].value
              })
            )
          : []

        const maxATData = maxATElement
          ? maxATElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                maxATValue: t.elementValue[0].value
              })
            )
          : []

        const UVIData = UVIElement
          ? UVIElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                UVINumber: t.elementValue[0].value,
                UVIValue: t.elementValue[1].value
              })
            )
          : []

        const minCIData = minCIElement
          ? minCIElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                minCIValue: t.elementValue[1].value
              })
            )
          : []

        const maxCIData = maxCIElement
          ? maxCIElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                maxCIValue: t.elementValue[1].value
              })
            )
          : []

        const RHData = RHElement
          ? RHElement.time.map(
              (t: { startTime: any; endTime: any; elementValue: { value: any }[] }) => ({
                startTime: t.startTime,
                endTime: t.endTime,
                RHValue: t.elementValue[0].value
              })
            )
          : []
        // 合併資料
        return {
          locationName: location.locationName,
          wxData,
          minTData,
          maxTData,
          minATData,
          maxATData,
          UVIData,
          minCIData,
          maxCIData,
          RHData
        }
      }
    )
  }

  // 時間範圍
  const filterDataByTimeOfDay = (data: any[], timeOfDay: 'morning' | 'evening') => {
    return data.filter((item) => {
      const startTime = new Date(item.startTime)
      const hour = startTime.getHours()
      if (startTime.getHours() === 0) {
        return false
      }
      if (timeOfDay === 'morning') {
        return hour >= 6 && hour < 18
      } else {
        return hour >= 18 || hour < 6
      }
    })
  }

  // 分類白天
  const filteredDayData = (cityName: string): WeatherData[] => {
    const cityData = combinedData.value.find(
      (data: { locationName: string }) => data.locationName === cityName
    )

    if (!cityData) return []

    const dayWxData = filterDataByTimeOfDay(cityData.wxData, 'morning')
    const dayMinTData = filterDataByTimeOfDay(cityData.minTData, 'morning')
    const dayMaxTData = filterDataByTimeOfDay(cityData.maxTData, 'morning')
    const dayMinCIData = filterDataByTimeOfDay(cityData.minCIData, 'morning')
    const dayMaxCIData = filterDataByTimeOfDay(cityData.maxCIData, 'morning')
    const dayRHData = filterDataByTimeOfDay(cityData.RHData, 'morning')
    const dayMinATData = filterDataByTimeOfDay(cityData.minATData, 'morning')
    const dayMaxATData = filterDataByTimeOfDay(cityData.maxATData, 'morning')
    const dayUVIData = filterDataByTimeOfDay(cityData.UVIData, 'morning')

    return mergeWeatherData(
      dayWxData,
      dayMinTData,
      dayMaxTData,
      dayMinCIData,
      dayMaxCIData,
      dayRHData,
      dayMinATData,
      dayMaxATData,
      dayUVIData
    )
  }

  // 分類晚上
  const filteredNightData = (cityName: string): WeatherData[] => {
    const cityData = combinedData.value.find(
      (data: { locationName: string }) => data.locationName === cityName
    )

    if (!cityData) return []

    const nightWxData = filterDataByTimeOfDay(cityData.wxData, 'evening')
    const nightMinTData = filterDataByTimeOfDay(cityData.minTData, 'evening')
    const nightMaxTData = filterDataByTimeOfDay(cityData.maxTData, 'evening')
    const nightMinCIData = filterDataByTimeOfDay(cityData.minCIData, 'evening')
    const nightMaxCIData = filterDataByTimeOfDay(cityData.maxCIData, 'evening')
    const nightRHData = filterDataByTimeOfDay(cityData.RHData, 'evening')
    const nightMinATData = filterDataByTimeOfDay(cityData.minATData, 'evening')
    const nightMaxATData = filterDataByTimeOfDay(cityData.maxATData, 'evening')
    const nightUVIData = filterDataByTimeOfDay(cityData.UVIData, 'morning')
    return mergeWeatherData(
      nightWxData,
      nightMinTData,
      nightMaxTData,
      nightMinCIData,
      nightMaxCIData,
      nightRHData,
      nightMinATData,
      nightMaxATData,
      nightUVIData
    ).slice(-7)
  }

  // 合併資料
  const mergeWeatherData = (
    wxData: any[],
    minTData: any[],
    maxTData: any[],
    minCIData: any[],
    maxCIData: any[],
    RHData: any[],
    minATData: any[],
    maxATData: any[],
    UVIData: any[]
  ) => {
    return wxData.map((wxItem) => {
      const minTItem = minTData.find((item) => item.startTime === wxItem.startTime)
      const maxTItem = maxTData.find((item) => item.startTime === wxItem.startTime)
      const minCIItem = minCIData.find((item) => item.startTime === wxItem.startTime)
      const maxCIItem = maxCIData.find((item) => item.startTime === wxItem.startTime)
      const RHItem = RHData.find((item) => item.startTime === wxItem.startTime)
      const minATItem = minATData.find((item) => item.startTime === wxItem.startTime)
      const maxATItem = maxATData.find((item) => item.startTime === wxItem.startTime)
      const UVIItem = UVIData.find((item) => item.startTime === wxItem.startTime)

      return {
        startTime: wxItem.startTime,
        endTime: wxItem.endTime,
        wxUnit: wxItem.wxUnit,
        wxValue: wxItem.wxValue,
        minTValue: minTItem ? minTItem.minTValue : 'N/A',
        maxTValue: maxTItem ? maxTItem.maxTValue : 'N/A',
        minCIValue: minCIItem ? minCIItem.minCIValue : 'N/A',
        maxCIValue: maxCIItem ? maxCIItem.maxCIValue : 'N/A',
        RHValue: RHItem ? RHItem.RHValue : 'N/A',
        minATValue: minATItem ? minATItem.minATValue : 'N/A',
        maxATValue: maxATItem ? maxATItem.maxATValue : 'N/A',
        UVIValue: UVIItem ? UVIItem.UVIValue : 'N/A',
        UVINumber: UVIItem ? UVIItem.UVINumber : 'N/A'
      }
    })
  }
  watch(weather, (newWeather) => {
    if (newWeather.length > 0) {
      updateCombinedData()
    }
  })
  onMounted(async () => {
    try {
      weatherData.value = await $fetch(
        'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-5A2506C9-9306-4857-8F19-D5455BFA4DE0'
      )
    } catch (error) {
      console.error('Failed to fetch weather data:', error)
    }
  })
  return {
    weatherData,
    weather,
    combinedData,
    filteredDayData,
    filteredNightData
  }
})
