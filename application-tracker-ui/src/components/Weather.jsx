'use client'

import { WeatherUtils } from "@/utils/weatherUtils"
import { useCallback, useEffect, useState } from "react"
import { DateTime } from "luxon"
import { Grid2, Typography } from "@mui/material"
import { WbSunny as Sunny, Thunderstorm, Tsunami, WarningRounded, WaterDrop, Waves } from '@mui/icons-material'


const IconBricked = ({ weather }) => {
  const { rain: percent, error } = weather ?? {}

  if (error) {
    return <WarningRounded sx={{ color: 'rgba(255, 189, 58, 1)' }} />
  }

  if (percent < 10) {
    return <Sunny sx={{ color: '#ffe019' }} />
  }

  if (percent < 30) {
    return <Waves sx={{ color: 'rgba(32, 255, 255, 1)' }} />
  }

  if (percent < 50) {
    return <WaterDrop sx={{ color: 'rgba(112, 157, 255, 1)' }} />
  }
  
  if (percent < 70) {
    return <Thunderstorm sx={{ color: 'rgba(255, 159, 0, 1)' }} />
  }

  if (percent < 70) {
    return <Tsunami sx={{ color: 'rgba(164, 156, 255, 1)' }} />
  }
}

const Weather = () => {
  const [weather, setWeather] = useState(null)

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

  const handleWeatherDenied = useCallback(() => {
    setWeather({ error: true })
  }, setWeather)

  useEffect(() => {
    if (!weather) {
      WeatherUtils.load(updateWeather, handleWeatherDenied)
    }
  }, [weather, updateWeather])

  if (!weather) { return null }

  return <Grid2 container sx={{ backgroundColor: 'rgba(75, 75, 75, 1)', padding: 1, borderRadius: 2 }} >
    <Grid2 sx={{ display: 'flex', alignItems: 'center' }} >
      <IconBricked weather={weather} />
    </Grid2>
    <Grid2 sx={{ ml: 1, display: 'flex', alignItems: 'center' }} >
      {
        weather?.error ?
          <Typography color='white' fontWeight='bold'>Unable to load weather data.</Typography>
        : <Typography color='white' fontWeight='bold'>{ weather?.string }</Typography>
      }
    </Grid2>
  </Grid2> 
}

export default Weather