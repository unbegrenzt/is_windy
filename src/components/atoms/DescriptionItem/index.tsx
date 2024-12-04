"use client";

import React from 'react';
import { ForecastData } from '@/utils/Interfaces';

interface DescriptionItemProps {
  forecastData: ForecastData;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({ forecastData }) => {
  let tip = '';

  if (parseInt(forecastData.precipitationProbability) > 50) {
    tip = 'Lleva un paraguas, hay alta probabilidad de lluvia.';
  } else if (parseInt(forecastData.cloudCover) > 50) {
    tip = 'El día estará nublado, podrías necesitar una chaqueta ligera.';
  } else if (parseInt(forecastData.temperature) > 30) {
    tip = 'Hace calor, mantente hidratado y usa protector solar.';
  } else if (parseInt(forecastData.temperature) < 10) {
    tip = 'Hace frío, asegúrate de abrigarte bien.';
  } else {
    tip = 'El clima está agradable, disfruta tu día.';
  }

  return <p className="text-sm text-gray-600 text-center">{tip}</p>;
};

export default DescriptionItem;
