import React, { useContext } from 'react';
import MeteoItem from '../Layout/MeteoItem';

import { Grid } from '@mui/material';

import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

import WeatherAppContext from '../../store/weatherAppContext';

const MeteoFooter = () => {
  const ctx = useContext(WeatherAppContext);

  return (
    <Grid container item>
      <Grid item xs={4}>
        <MeteoItem
          value={Math.round(ctx.currentDay.temp)}
          unit='°C'
          name='Temperature'
        >
          <ThermostatOutlinedIcon />
        </MeteoItem>
      </Grid>
      <Grid item xs={4}>
        <MeteoItem value={ctx.currentDay.wind_speed} unit='m/s' name='Wind'>
          <AirIcon />
        </MeteoItem>
      </Grid>
      <Grid item xs={4}>
        <MeteoItem value={ctx.currentDay.humidity} unit='%' name='Humidity'>
          <OpacityIcon />
        </MeteoItem>
      </Grid>
    </Grid>
  );
};

export default MeteoFooter;
