import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeatherCard from './index';
import useStore from '../../../store/useStore';
import { transformWeatherData } from '../../../utils/ArrayUtils';
import { getUserTimeZone } from '../../../utils/DateUtils';

// Mock del store y sus funciones
jest.mock('../../../store/useStore', () => {
  return jest.fn(() => ({
    setForecastData: jest.fn(), // Mock de la función
    forecastData: [], // Estado inicial
  }));
});

// Mock de utilidades
jest.mock('../../../utils/ArrayUtils', () => ({
  transformWeatherData: jest.fn(),
}));

jest.mock('../../../utils/DateUtils', () => ({
  getUserTimeZone: jest.fn(() => 'UTC'),
}));

// Mock de componentes
jest.mock('../../atoms/LoadingAnimationFull', () => {
  return () => <div>Loading...</div>;
});

jest.mock('../../atoms/AnimationWeather', () => {
  return ({ forecastData }) => <div>Animation for {forecastData.temperature}</div>;
});

jest.mock('../../atoms/DescriptionItem', () => {
  return ({ forecastData }) => <div>Description for {forecastData.humidity}</div>;
});

describe('WeatherCard', () => {
  const mockSetForecastData = jest.fn();
  const mockForecastData = [
    {
      time: '2024-12-04T12:00:00',
      isNow: true,
      temperature: '20°C',
      humidity: '80%',
    },
  ];

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      setForecastData: mockSetForecastData,
      forecastData: mockForecastData,
    });
    (transformWeatherData as jest.Mock).mockResolvedValue(mockForecastData);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el componente Loading mientras se carga la data', async () => {
    (useStore as jest.Mock).mockReturnValue({
      setForecastData: jest.fn(),
      forecastData: [],
    });

    await act(async () => {
      render(<WeatherCard display_name="Test Location" lat="12.34" lon="56.78" />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('muestra el contenido del clima correctamente', async () => {
    await act(async () => {
      render(<WeatherCard display_name="Test Location" lat="12.34" lon="56.78" />);
    });

    await waitFor(() => {
      expect(screen.getByText(/test location/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
  });

  it('maneja errores al obtener datos del clima', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API error'));

    await act(async () => {
      render(<WeatherCard display_name="Test Location" lat="12.34" lon="56.78" />);
    });

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    expect(mockSetForecastData).not.toHaveBeenCalled();
  });
});
