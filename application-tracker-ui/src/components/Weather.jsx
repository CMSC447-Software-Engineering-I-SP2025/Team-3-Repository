'use client'

import { WeatherUtils } from "@/utils/weatherUtils"
import { useCallback, useEffect, useState } from "react"
import { DateTime } from "luxon"
import { Grid2, Typography } from "@mui/material"
import { WbSunny as Sunny, Thunderstorm, Tsunami, WaterDrop, Waves } from '@mui/icons-material'


const IconBricked = ({ percent }) => {
  if (percent < 10) {
    return <Sunny/>
  }

  if (percent < 30) {
    return <Waves/>
  }

  if (percent < 50) {
    return <WaterDrop/>
  }
  
  if (percent < 70) {
    return <Thunderstorm/>
  }

  if (percent < 70) {
    return <Tsunami/>
  }
}

const Weather = () => {
  const [weather, setWeather] = useState()

  const updateWeather = useCallback(async position => {
    const { latitude: lat, longitude: long } = position.coords

    const apiResponse = await WeatherUtils.fetchData(lat, long)

    if (apiResponse?.error) {
      setWeather({ error: true })
      return
    }

    const now = DateTime.now()
    const fmt = `${now.toISODate()}T${now.toFormat('hh:00')}`

    const {
      time,
      temperature_2m: tmps,
      precipitation_probability: precip
    } = apiResponse?.hourly

    const tempUnit = apiResponse?.hourly_units?.temperature_2m
    const precipUnit = apiResponse?.hourly_units?.precipitation_probability

    const idx = time.indexOf(fmt)
    if (idx < 0) {
      setWeather({ error: true })
      return
    }

    const temp = tmps?.[idx] ?? null
    const rain = precip?.[idx] ?? null

    const newState = {
      string: `Temperature: ${temp} ${tempUnit}, Chance of Rain: ${rain}${precipUnit}`,
      temp,
      rain,
      error: null
    }

    setWeather(newState)
  }, [setWeather]) 

  useEffect(() => {
    if (!weather) {
      WeatherUtils.load(updateWeather)
    }
  }, [weather, updateWeather])

  if (!weather) { return null }

  return <Grid2 container>
    <Grid2>
      <IconBricked percent={weather?.rain} />
    </Grid2>
    <Grid2>
      <Typography fontWeight='bold'>{ weather?.string }</Typography>
    </Grid2>
  </Grid2> 
}

export default Weather