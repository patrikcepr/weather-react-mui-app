import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  SVGAttributes,
  FunctionComponent,
  ReactNode,
} from "react";

// comment out for real life
import data_obj_today from "../assets/data-obj-tonight.json";

// uncomment for real life
import { apiKey } from "../apiConfig";

// weather icons
import brokenCloudsImg from "../assets/svg/broken_clouds.svg";
import clearDayImg from "../assets/svg/clear_sky.svg";
import clearNightImg from "../assets/svg/clear_skyN.svg";
import cloudsDayImg from "../assets/svg/few_clouds.svg";
import cloudsNightImg from "../assets/svg/few_cloudsN.svg";
import drizzleImg from "../assets/svg/drizzle.svg";
import fogImg from "../assets/svg/fog.svg";
import rainImg from "../assets/svg/rain.svg";
import snowImg from "../assets/svg/snow.svg";
import thunderstormImg from "../assets/svg/thunderstorm.svg";

// temperature icons
import tempBelowIco from "../assets/svg/temp_minus.svg";
import tempZeroIco from "../assets/svg/temp_zero.svg";
import tempLowIco from "../assets/svg/temp_low.svg";
import tempMidIco from "../assets/svg/temp_mid.svg";
import tempHotIco from "../assets/svg/temp_hot.svg";

interface IWeatherAppContext {
  data: object;
  currentDay: object;
  currentDayWeather: string;
  getForecast: () => void;
  isLoading: boolean;
  error: any;
  toTime: (val: number) => string;
  toDateTime: (val: number) => string;
  toWeekDay: (val: number) => string;
  assignWeatherIcon: (
    weather: string,
    night: boolean
  ) => FunctionComponent<SVGAttributes<SVGElement>>;
  night: boolean;
  now: number;
  tempIcon: (
    temp: number
  ) => FunctionComponent<SVGAttributes<SVGElement>> | undefined;
}

const WeatherAppContext = createContext({} as IWeatherAppContext);

export const WeatherAppContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(data_obj_today);

  //date from UTC time stamp
  const toTime = (val: number) =>
    new Date(val * 1000).toLocaleTimeString("cs-CZ");
  const toDateTime = (val: number) =>
    new Date(val * 1000).toLocaleString("cs-CZ");
  const toWeekDay = (val: number) =>
    new Date(val * 1000)
      .toLocaleString("un-US", { weekday: "short" })
      .toUpperCase();

  // assign the proper weather icon
  const assignWeatherIcon = (weather: string, night: boolean) => {
    switch (weather) {
      case "Clear":
        return night ? clearNightImg : clearDayImg;
      case "Clouds":
        return night ? cloudsNightImg : cloudsDayImg;
      case "Drizzle":
        return drizzleImg;
      case "Fog":
        return fogImg;
      case "Rain":
        return rainImg;
      case "Snow":
        return snowImg;
      case "Thunderstorm":
        return thunderstormImg;
      default:
        return brokenCloudsImg;
    }
  };

  // choose temperature icon
  const tempIcon = (temp: number) => {
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
  const place = {
    name: "Letná",
    lat: 50.096034,
    lon: 14.425966,
  };

  // uncomment for real life
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${place.lat}&lon=${place.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  const isNight = (now: number, sunrise: number, sunset: number) => {
    if (
      now < sunrise || // midnight to sunrise -> night
      now > sunset // dark after today sunset -> night
    ) {
      // console.log("it's night");
      return true;
    } else {
      // console.log("it's day");
      return false;
    }
  };

  const getForecastHandler = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        // uncomment for real life
        const response = await fetch(url);
        // uncomment for real life
        const data = await response.json();
        // comment out for real life
        // console.log('FETCHing Dummy');
        setData(() => data);
      } catch (error: any) {
        console.log("error", error);
        setError(() => error.message);
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getForecastHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherAppContext.Provider
      value={{
        data: data,
        currentDay: data.current,
        currentDayWeather: data.current.weather[0].main,
        getForecast: getForecastHandler,
        isLoading: isLoading,
        error: error,
        toTime,
        toDateTime,
        toWeekDay,
        assignWeatherIcon,
        now: data.current.dt,
        night: isNight(
          data.current.dt,
          data.current.sunrise,
          data.current.sunset
        ),
        tempIcon,
      }}
    >
      {children}
    </WeatherAppContext.Provider>
  );
};

export default WeatherAppContext;