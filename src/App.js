import React, { Fragment, useContext } from 'react';
import MeteoItem from './components/Layout/MeteoItem';

import {
  Button,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

import WeatherAppContext from './store/weatherAppContext';

import './App.css';

function App() {
  const ctx = useContext(WeatherAppContext);

  // let content = <h2>Data is loading....</h2>;

  // if (!ctx.isLoading && ctx.currentDay.weather.length > 0) {
  //   content = ctx.currentDay.weather[0].main;
  // }

  // if (!ctx.isLoading && ctx.currentDay.length === 0 && !ctx.error) {
  //   content = <h2>No data received</h2>;
  // }

  // if (ctx.error) {
  //   content = <h2>{ctx.error}</h2>;
  // }

  return (
    <Fragment>
      <CssBaseline />
      <Grid container maxWidth='md' sx={{ margin: '0 auto' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h3' component='div' textAlign='center'>
                {ctx.timezone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h3' component='div' textAlign='center'>
                {ctx.currentDayMainWeather}
                {/* {content} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <MeteoItem value={ctx.currentDay.temp} unit='°C' name='Temp.'>
            <ThermostatOutlinedIcon />
          </MeteoItem>
        </Grid>
        <Grid item xs={4}>
          <MeteoItem value={ctx.currentDay.wind_speed} unit='km/h' name='Wind'>
            <AirIcon />
          </MeteoItem>
        </Grid>
        <Grid item xs={4}>
          <MeteoItem value={ctx.currentDay.humidity} unit='%' name='Humid.'>
            <OpacityIcon />
          </MeteoItem>
        </Grid>
      </Grid>
      <Button
        onClick={ctx.getForecast}
        variant='contained'
        size='large'
        color='success'
      >
        Fetch Forecast
      </Button>
    </Fragment>
  );
}

export default App;
