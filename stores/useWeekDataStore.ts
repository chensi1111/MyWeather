export const useWeekDataStore = defineStore('WeekData', () => {
  interface WeatherData {
    StartTime: string
    EndTime: string
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
    return weatherData.value?.records?.Locations[0]?.Location || []
  })

  const combinedData = ref<any[]>([])

  const updateCombinedData = () => {
    console.log('weather.value:', weather.value)
    combinedData.value = weather.value.map(
      (location: { WeatherElement: any[]; LocationName: any }) => {
        const wxElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "天氣現象"
        )
        const minTElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最低溫度"
        )
        const maxTElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最高溫度"
        )
        const UVIElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "紫外線指數"
        )
        const minATElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最低體感溫度"
        )
        const maxATElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最高體感溫度"
        )
        const minCIElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最小舒適度指數"
        )
        const maxCIElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "最大舒適度指數"
        )
        const RHElement = location.WeatherElement.find(
          (el: { ElementName: string }) => el.ElementName === "平均相對濕度"
        )

        const wxData = wxElement
          ? wxElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                wxValue: t.ElementValue[0].Weather,
                wxUnit: t.ElementValue[0].WeatherCode
              })
            )
          : []

        const minTData = minTElement
          ? minTElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                minTValue: t.ElementValue[0].MinTemperature
              })
            )
          : []

        const maxTData = maxTElement
          ? maxTElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                maxTValue: t.ElementValue[0].MaxTemperature
              })
            )
          : []

        const minATData = minATElement
          ? minATElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                minATValue: t.ElementValue[0].MinApparentTemperature
              })
            )
          : []

        const maxATData = maxATElement
          ? maxATElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any}) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                maxATValue: t.ElementValue[0].MaxApparentTemperature
              })
            )
          : []

        const UVIData = UVIElement
          ? UVIElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                UVINumber: t.ElementValue[0].UVIndex,
                UVIValue: t.ElementValue[0].UVExposureLevel
              })
            )
          : []

        const minCIData = minCIElement
          ? minCIElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                minCIValue: t.ElementValue[0].MinComfortIndexDescription
              })
            )
          : []

        const maxCIData = maxCIElement
          ? maxCIElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                maxCIValue: t.ElementValue[0].MaxComfortIndexDescription
              })
            )
          : []

        const RHData = RHElement
          ? RHElement.Time.map(
              (t: { StartTime: any; EndTime: any; ElementValue: any }) => ({
                StartTime: t.StartTime,
                EndTime: t.EndTime,
                RHValue: t.ElementValue[0].RelativeHumidity
              })
            )
          : []
        // 合併資料
        return {
          LocationName: location.LocationName,
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
      const StartTime = new Date(item.StartTime)
      const hour = StartTime.getHours()
      if (StartTime.getHours() === 0) {
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
      (data: { LocationName: string }) => data.LocationName === cityName
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
      (data: { LocationName: string }) => data.LocationName === cityName
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
      const minTItem = minTData.find((item) => item.StartTime === wxItem.StartTime)
      const maxTItem = maxTData.find((item) => item.StartTime === wxItem.StartTime)
      const minCIItem = minCIData.find((item) => item.StartTime === wxItem.StartTime)
      const maxCIItem = maxCIData.find((item) => item.StartTime === wxItem.StartTime)
      const RHItem = RHData.find((item) => item.StartTime === wxItem.StartTime)
      const minATItem = minATData.find((item) => item.StartTime === wxItem.StartTime)
      const maxATItem = maxATData.find((item) => item.StartTime === wxItem.StartTime)
      const UVIItem = UVIData.find((item) => item.StartTime === wxItem.StartTime)

      return {
        StartTime: wxItem.StartTime,
        EndTime: wxItem.EndTime,
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
    if (newWeather) {
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
