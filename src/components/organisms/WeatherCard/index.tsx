"use client";

import { OSMResponseObj } from '@/components/atoms/ResultsList/ResultList.types';
import useStore from '@/store/useStore';
import { transformWeatherData } from '@/utils/ArrayUtils';
import { getUserTimeZone } from '@/utils/DateUtils';
import DescriptionItem from '@/components/atoms/DescriptionItem';
import React from 'react';

import dynamic from "next/dynamic";

const LoadingAnimationFullNoSSR = dynamic(() => import("@/components/atoms/LoadingAnimationFull"), {
  ssr: false,
});

const AnimationWeather = dynamic(() => import("@/components/atoms/AnimationWeather"), {
  ssr: false,
});

const WeatherCard: React.FC<OSMResponseObj> = ({ display_name, lat, lon }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const setForecastData = useStore((state) => state.setForecastData);
  const forecastData = useStore((state) => state.forecastData);

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover&timezone=${getUserTimeZone()}&forecast_days=1`);
        const data = await response.json();
        const forecastParsed = await transformWeatherData(data);
        setForecastData(forecastParsed);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return (
    <>
      {(isLoading || forecastData.length === 0) ? (
        <LoadingAnimationFullNoSSR />
      ) : (
        <>
          {Array.isArray(forecastData) &&
            forecastData
              .filter((data) => data.isNow)
              .map((data) => (
                <div key={data.time}>
                  <h2 className='text-2xl text-center'>{display_name}</h2>
                  <div className='flex items-center justify-center'>
                    <AnimationWeather forecastData={data} />
                  </div>
                  <p className='text-xl font-bold text-center'>{data.temperature}</p>
                  <p className='text-xl font-bold text-center'>{data.humidity} (Humedad)</p>
                  <DescriptionItem forecastData={data} />
                </div>
              ))}
        </>
      )}
    </>
  );
};

export default WeatherCard;
