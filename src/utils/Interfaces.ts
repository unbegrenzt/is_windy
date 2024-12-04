export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation_probability: string;
  cloud_cover: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  cloud_cover: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
}

export interface ForecastData {
  date: string; // Fecha en formato 'DD / MM'
  time: string; // Hora en formato 'HH:mm'
  temperature: string; // Temperatura con unidad
  humidity: string; // Humedad con unidad
  precipitationProbability: string; // Probabilidad de precipitación con unidad
  cloudCover: string; // Cobertura de nubes con unidad
  isNow: boolean; // Indica si es la hora actual
}
