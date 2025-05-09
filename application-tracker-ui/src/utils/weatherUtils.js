'use client'

const failure = () => {}

const load = setter => {
  if (typeof window === 'undefined') { return }
  navigator?.geolocation?.getCurrentPosition(setter, failure)
}

const fetchData = async (lat, long) => {
  const params = {
    latitude: lat.toFixed(2),
    longitude: long.toFixed(2),
    hourly: 'temperature_2m,precipitation_probability',
    forecast_days: 1
  }
  const search = new URLSearchParams(params).toString()

  const urlbase = `https://api.open-meteo.com/v1/forecast?${search}`
  return await fetch(urlbase)
  .then(async rez => {
    if (rez.status !== 200) {
      return { error: true }
    }

    return { ...await rez.json() }
  })
}

export const WeatherUtils = {
  load,
  fetchData 
}