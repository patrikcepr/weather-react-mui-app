import React, { useContext } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import WeatherAppContext from '../../store/weatherAppContext';

// import letnaEarlySummer from './assets/img/letna_EarlySummer.jpg';
import letnaWinterNoSnow from '../../assets/img/letnaWinterNoSnow.jpg';

const MeteoMain = (props) => {
  const ctx = useContext(WeatherAppContext);

  // get weather type to choose the icon
  let weather = ctx.currentDayMainWeather;

  // set the right icon
  let iconSrc = ctx.assignWeatherIcon(weather, ctx.night);

  // gradient over background photo dependent on time (and weather later)
  let photoOverlay = ctx.night
    ? `linear-gradient(215deg, #0F2027dd, #203A43cc)`
    : `linear-gradient(35deg, #2C536488, #203A4377)`;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-evenly',
        background: `${photoOverlay}, url(${letnaWinterNoSnow})`,
        backgroundColor: 'primary.dark',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography
          variant='h3'
          textAlign='center'
          paddingBottom={1}
          sx={{ filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }}
        >
          {props.content}
        </Typography>
        <img
          src={iconSrc}
          alt={weather}
          height='180px'
          style={{
            filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
          }}
        />
        <Typography
          variant='h5'
          textAlign='center'
          paddingTop={1}
          sx={{ filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }}
        >
          {ctx.currentDay.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MeteoMain;
