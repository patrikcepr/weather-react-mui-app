import React, { createContext, useState, useCallback, useEffect } from 'react';

// import { apiKey } from '../apiConfig';

const WeatherAppContext = createContext({
  currentDay: {},
  currentDayMainWeather: '',
  timezone: '',
  getForecast: () => {},
  isLoading: Boolean,
  error: null,
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
  const [timezone, setTimezone] = useState('Prague');
  const [currentDayMainWeather, setCurrentDayMainWeather] = useState('Rain');

  // const letna = {
  //   name: 'Letná',
  //   lat: 50.096034,
  //   lon: 14.425966,
  //   exclude: 'minutely,hourly,alerts',
  // };

  // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${letna.lat}&lon=${letna.lon}&exclude=${letna.exclude}&appid=${apiKey}&units=metric`;

  const url = '';

  const getForecastHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentDay(data.current);
      setTimezone(data.timezone);
      // console.log(currentDay);
      // console.log(data);
    } catch (error) {
      console.log('error', error);
      setError(error.message);
    }
    setIsLoading(false);
  }, [url]);

  // const [state, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    getForecastHandler();
    setCurrentDayMainWeather(currentDay.weather[0].main);
  }, [getForecastHandler, currentDay.weather]);

  return (
    <WeatherAppContext.Provider
      value={{
        currentDay: currentDay,
        currentDayMainWeather: currentDayMainWeather,
        timezone: timezone,
        getForecast: getForecastHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </WeatherAppContext.Provider>
  );
};

export default WeatherAppContext;
