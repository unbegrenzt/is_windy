"use client";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ForecastData, WeatherData } from "./Interfaces";

dayjs.extend(utc);
dayjs.extend(timezone);

export const transformWeatherData = async (weatherData: WeatherData): Promise<ForecastData[]> => {
  const data = weatherData.hourly;
  const now = dayjs().tz(weatherData.timezone);

  const userTimezone = await getTimezoneFromCoordinates(weatherData.latitude, weatherData.longitude, weatherData.timezone);

  const forecast = data.time.map((time, index) => {
    const forecastTime = dayjs(time).tz(userTimezone);
    return {
      date: forecastTime.format('DD / MM'),
      time: forecastTime.format('HH:mm'),
      temperature: `${data.temperature_2m[index]} ${weatherData.hourly_units.temperature_2m}`,
      humidity: `${data.relative_humidity_2m[index]} ${weatherData.hourly_units.relative_humidity_2m}`,
      precipitationProbability: `${data.precipitation_probability[index]} ${weatherData.hourly_units.precipitation_probability}`,
      cloudCover: `${data.cloud_cover[index]} ${weatherData.hourly_units.cloud_cover}`,
      isNow: forecastTime.isSame(now, 'hour')
    };
  });

  return forecast;
};
export const getTimezoneFromCoordinates = async (latitude: number, longitude: number, defaultTz: string): Promise<string> => {
  try {
    const response = await fetch(`http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=f8jp46kkzu2duku`);
    const data = await response.json();

    const timezoneId = data?.timezoneId;

    if (timezoneId) {
      return timezoneId;
    } else {
      console.warn('No timezone found for coordinates, using default:', defaultTz);
      return defaultTz;
    }
  } catch (error) {
    console.error('Error fetching timezones:', error);
    return defaultTz;
  }
};
