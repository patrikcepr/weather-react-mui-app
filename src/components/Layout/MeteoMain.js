import React, { useContext } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import WeatherAppContext from '../../store/weatherAppContext';

// import letnaEarlySummer from './assets/img/letna_EarlySummer.jpg';
import letnaWinterNoSnow from '../../assets/img/letnaWinterNoSnow.jpg';

const MeteoMain = (props) => {
  const ctx = useContext(WeatherAppContext);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-evenly',
        background: `linear-gradient(35deg, #2C536488, #203A4377), url(${letnaWinterNoSnow})`,
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
        <Typography variant='h3' textAlign='center' paddingBottom={1}>
          {props.content}
        </Typography>
        <img src={props.icon} alt={props.weather} height='180px' />
        <Typography variant='h5' textAlign='center' paddingTop={1}>
          {ctx.currentDay.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MeteoMain;
