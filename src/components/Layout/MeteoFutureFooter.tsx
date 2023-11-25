import React, { Fragment, useContext } from 'react';

import WeatherAppContext from '../../store/weatherAppContext';
import MeteoFooterDaily from './MeteoFooterDaily';

import { Grid } from '@mui/material';

const MeteoFutureFooter = () => {
  const ctx = useContext(WeatherAppContext);

  //Future days
  const tomorrow = ctx.data.daily[1];
  const day2 = ctx.data.daily[2];
  const day3 = ctx.data.daily[3];

  // get weather type to choose the icon
  const weatherTomorrow = tomorrow.weather[0].main;
  const weatherDay2 = day2.weather[0].main;
  const weatherDay3 = day3.weather[0].main;

  // set the right icon
  const iconSrc1 = ctx.assignWeatherIcon(weatherTomorrow);
  const iconSrc2 = ctx.assignWeatherIcon(weatherDay2);
  const iconSrc3 = ctx.assignWeatherIcon(weatherDay3);

  return (
    <Fragment>
      <MeteoFooterDaily>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Grid item>{ctx.toWeekDay(tomorrow.dt)}</Grid>
          <Grid item>{Math.round(tomorrow.temp.day)} °C</Grid>
        </Grid>
        <img
          src={iconSrc1}
          alt={weatherTomorrow}
          height='50px'
          style={{
            filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
          }}
        />
      </MeteoFooterDaily>
      <MeteoFooterDaily>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Grid item>{ctx.toWeekDay(day2.dt)}</Grid>
          <Grid item>{Math.round(day2.temp.day)} °C</Grid>
        </Grid>
        <img
          src={iconSrc2}
          alt={weatherDay2}
          height='50px'
          style={{
            filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
          }}
        />
      </MeteoFooterDaily>
      <MeteoFooterDaily>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Grid item>{ctx.toWeekDay(day3.dt)}</Grid>
          <Grid item>{Math.round(day3.temp.day)} °C</Grid>
        </Grid>
        <img
          src={iconSrc3}
          alt={weatherDay3}
          height='50px'
          style={{
            filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
          }}
        />
      </MeteoFooterDaily>
    </Fragment>
  );
};

export default MeteoFutureFooter;
