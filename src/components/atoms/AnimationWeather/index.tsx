"use client";

import React from 'react';
import Lottie from 'lottie-react';
import sunnyAnimation from '../../../../public/animations/sunny.json';
import rainyAnimation from '../../../../public/animations/rainy.json';
import cloudyDayAnimation from '../../../../public/animations/cloudyDay.json';
import cloudyNightAnimation from '../../../../public/animations/cloudyNight.json';
import moonAnimation from '../../../../public/animations/moon.json';
import { ForecastData } from '@/utils/Interfaces';

interface AnimationWeatherProps {
  forecastData: ForecastData;
}

const AnimationWeather: React.FC<AnimationWeatherProps> = ({ forecastData }) => {
  let animationData;

  const currentHour = parseInt(forecastData.time.split(':')[0]);

  if (parseInt(forecastData.precipitationProbability) > 50) {
    animationData = rainyAnimation;
  } else if (parseInt(forecastData.cloudCover) > 50) {
    if (currentHour >= 18 || currentHour < 6) {
      animationData = cloudyNightAnimation;
    } else {
      animationData = cloudyDayAnimation;
    }
  } else if (currentHour >= 18 || currentHour < 6) {
    animationData = moonAnimation;
  } else {
    animationData = sunnyAnimation;
  }

  return (
    <div className='w-72 h-72'>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimationWeather;
