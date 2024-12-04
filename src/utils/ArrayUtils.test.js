import { transformWeatherData } from './ArrayUtils';
import dayjs from 'dayjs';

global.fetch = jest.fn();

describe('transformWeatherData', () => {
  const mockWeatherData = {
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: 'America/Los_Angeles',
    hourly: {
      time: ['2024-12-03T12:00:00Z', '2024-12-03T13:00:00Z'],
      temperature_2m: [15, 16],
      relative_humidity_2m: [60, 65],
      precipitation_probability: [10, 20],
      cloud_cover: [50, 60],
    },
    hourly_units: {
      temperature_2m: '°C',
      relative_humidity_2m: '%',
      precipitation_probability: '%',
      cloud_cover: '%',
    },
  };

  const mockTimezoneResponse = {
    timezoneId: 'America/Los_Angeles',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockTimezoneResponse),
    });
  });

  it('should correctly transform weather data', async () => {
    const result = await transformWeatherData(mockWeatherData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `http://api.geonames.org/timezoneJSON?lat=${mockWeatherData.latitude}&lng=${mockWeatherData.longitude}`
      )
    );

    expect(result).toEqual([
      {
        date: dayjs('2024-12-03T12:00:00Z').tz(mockTimezoneResponse.timezoneId).format('DD / MM'),
        time: dayjs('2024-12-03T12:00:00Z').tz(mockTimezoneResponse.timezoneId).format('HH:mm'),
        temperature: '15 °C',
        humidity: '60 %',
        precipitationProbability: '10 %',
        cloudCover: '50 %',
        isNow: false,
      },
      {
        date: dayjs('2024-12-03T13:00:00Z').tz(mockTimezoneResponse.timezoneId).format('DD / MM'),
        time: dayjs('2024-12-03T13:00:00Z').tz(mockTimezoneResponse.timezoneId).format('HH:mm'),
        temperature: '16 °C',
        humidity: '65 %',
        precipitationProbability: '20 %',
        cloudCover: '60 %',
        isNow: false,
      },
    ]);
  });

  it('should fallback to default timezone when API fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const result = await transformWeatherData(mockWeatherData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `http://api.geonames.org/timezoneJSON?lat=${mockWeatherData.latitude}&lng=${mockWeatherData.longitude}`
      )
    );

    expect(result[0].date).toBe(
      dayjs(mockWeatherData.hourly.time[0]).tz(mockWeatherData.timezone).format('DD / MM')
    );
    expect(result).toHaveLength(mockWeatherData.hourly.time.length);
  });
});
