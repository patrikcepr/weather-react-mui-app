import React, { createContext, useState, useCallback, useEffect } from 'react';

// uncomment for real life
// import { apiKey } from '../apiConfig';

// comment out for real life
// import data_obj from '../assets/data-obj.json';
import data_obj_today from '../assets/data-obj-today.json';

// weather icons
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

// temperature icons
import tempBelowIco from '../assets/svg/temp_minus.svg';
import tempZeroIco from '../assets/svg/temp_zero.svg';
import tempLowIco from '../assets/svg/temp_low.svg';
import tempMidIco from '../assets/svg/temp_mid.svg';
import tempHotIco from '../assets/svg/temp_hot.svg';

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
  now: Number,
  night: Boolean,
  setNight: () => {},
  tempIcon: () => {},
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
  const [now, setNow] = useState(null);
  const [night, setNight] = useState(null);

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

  const tempIcon = (temp) => {
    if (temp < 0) {
      return tempBelowIco;
    }
    if (temp === 0) {
      return tempZeroIco;
    }
    if (temp > 0 && temp < 10) {
      return tempLowIco;
    }
    if (temp >= 10 && temp < 25) {
      return tempMidIco;
    }
    if (temp >= 25) {
      return tempHotIco;
    }
  };

  // uncomment for real life
  // const place = {
  //   name: 'Letná',
  //   lat: 50.096034,
  //   lon: 14.425966,
  // };

  // uncomment for real life
  // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${place.lat}&lon=${place.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  const getForecastHandler = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        // uncomment for real life
        // const response = await fetch(url);
        // uncomment for real life
        // const data = await response.json();
        // comment out for real life
        const data = data_obj_today;
        // comment out for real life
        console.log('FETCHing');
        await setData(() => data);
        //set current day object
        setCurrentDay(() => data.current);
        // set timezone (location)
        setTimezone(() => data.timezone);
        setCurrentDayMainWeather(() => data.current.weather[0].main);
        // set time
        setNow(data.current.dt);
        // set day or night
        setNight(() => {
          if (
            data.current.dt < data.current.sunrise || // midnight to sunrise -> night
            data.current.dt > data.current.sunset || // dark after today sunset -> night
            data.current.dt < data.daily[0].sunrise // before tomorrow sunrise -> night
          ) {
            console.log("it's night");
            return true;
          } else {
            console.log("it's day");
            return false;
          }
        });
      } catch (error) {
        console.log('error', error);
        setError(() => error.message);
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // uncomment for real life
      // url,
    ]
  );

  useEffect(() => {
    getForecastHandler();
    // console.log('useEffNight is ' + night);
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
        now: now,
        night: night,
        setNight: setNight,
        tempIcon: tempIcon,
      }}
    >
      {props.children}
    </WeatherAppContext.Provider>
  );
};

export default WeatherAppContext;
