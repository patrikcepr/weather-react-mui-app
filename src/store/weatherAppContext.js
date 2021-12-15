import React, { createContext, useState, useCallback, useEffect } from 'react';

// import { apiKey } from '../apiConfig';

import data_obj from '../assets/data-obj.json';

import brokenCloudsImg from '../assets/svg/broken_clouds.svg';
import clearDayImg from '../assets/svg/clear_sky.svg';
import clearNightImg from '../assets/svg/clear_skyN.svg';
import cloudsDayImg from '../assets/svg/few_clouds.svg';
import cloudsNightImg from '../assets/svg/few_cloudsN.svg';
import drizzleImg from '../assets/svg/drizzle.svg';
import fogImg from '../assets/svg/fog.svg';
import rainImg from '../assets/svg/rain.svg';
import snowImg from '../assets/svg/snow.svg';
import thunderstormImg from '../assets/svg/thunderstorm.svg';

const WeatherAppContext = createContext({
  currentDay: {},
  currentDayMainWeather: '',
  timezone: '',
  getForecast: () => {},
  isLoading: Boolean,
  error: null,
  toTime: () => {},
  toDateTime: () => {},
  data: {},
  setData: () => {},
  assignWeatherIcon: () => {},
  night: Boolean,
  setNight: () => {},
});

export const WeatherAppContextProvider = (props) => {
  const [currentDay, setCurrentDay] = useState({
    temp: 2,
    wind_speed: 5.3,
    humidity: 88,
    weather: [{ main: 'Snow' }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timezone, setTimezone] = useState('');
  const [currentDayMainWeather, setCurrentDayMainWeather] = useState('');
  const [data, setData] = useState({});
  const [night, setNight] = useState(true);

  //date from UTC time stamp
  const toTime = (val) => new Date(val * 1000).toLocaleTimeString('cs-CZ');
  const toDateTime = (val) => new Date(val * 1000).toLocaleString('cs-CZ');

  // assign the proper icon
  const assignWeatherIcon = (weather, night) => {
    switch (weather) {
      case 'Clear':
        return night ? clearNightImg : clearDayImg;
      case 'Clouds':
        return night ? cloudsNightImg : cloudsDayImg;
      case 'Drizzle':
        return drizzleImg;
      case 'Fog':
        return fogImg;
      case 'Rain':
        return rainImg;
      case 'Snow':
        return snowImg;
      case 'Thunderstorm':
        return thunderstormImg;
      default:
        return brokenCloudsImg;
    }
  };

  // const place = {
  //   name: 'Letná',
  //   lat: 50.096034,
  //   lon: 14.425966,
  // };

  // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${place.lat}&lon=${place.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  // const url = '';

  const getForecastHandler = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        // const response = await fetch(url);
        // const data = await response.json();
        const data = data_obj;
        console.log('FETCH');
        await setData(data);
        //set current day object
        setCurrentDay(data.current);
        // set timezone (location)
        setTimezone(data.timezone);
        setCurrentDayMainWeather(data.current.weather[0].main);
        // set day or night
        data.current.dt > data.current.sunset
          ? setNight(true)
          : setNight(false);
      } catch (error) {
        console.log('error', error);
        setError(error.message);
      }
      setIsLoading(false);
    },
    [
      // url
    ]
  );

  useEffect(() => {
    console.log('useEffect');
    getForecastHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherAppContext.Provider
      value={{
        currentDay: currentDay,
        currentDayMainWeather: currentDayMainWeather,
        timezone: timezone,
        getForecast: getForecastHandler,
        isLoading: isLoading,
        error: error,
        toTime: toTime,
        toDateTime: toDateTime,
        data: data,
        setData: setData,
        assignWeatherIcon: assignWeatherIcon,
        night: night,
        setNight: setNight,
      }}
    >
      {props.children}
    </WeatherAppContext.Provider>
  );
};

export default WeatherAppContext;
