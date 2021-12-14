import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';

import {
  Button,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';

// import brokenCloudsImg from './assets/svg/broken_clouds.svg';
// import snowImg from './assets/svg/snow.svg';
// import rainImg from './assets/svg/rain.svg';
// import cloudsImg from './assets/svg/few_clouds.svg';

import './App.css';
// import { Image } from '@mui/icons-material';

function App() {
  const ctx = useContext(WeatherAppContext);

  let content = <h2>Data is loading....</h2>;

  if (!ctx.isLoading && ctx.currentDay.weather.length > 0) {
    content = ctx.currentDayMainWeather;
  }

  if (!ctx.isLoading && ctx.currentDay.length === 0 && !ctx.error) {
    content = <h2>No data received</h2>;
  }

  if (ctx.error) {
    content = <h2>{ctx.error}</h2>;
  }

  // const assignWeatherIcon = (weather) => {
  //   switch (weather) {
  //     case 'Rain':
  //       return rainImg;
  //     case 'Snow':
  //       return snowImg;
  //     case 'Clouds':
  //       return cloudsImg;
  //     default:
  //       console.log(weather);
  //       return brokenCloudsImg;
  //   }
  // };

  let weather = ctx.currentDayMainWeather;
  console.log(weather);
  let iconSrc = ctx.assignWeatherIcon(weather);

  console.log(iconSrc);

  return (
    <Fragment>
      <CssBaseline />
      <Grid
        container
        maxWidth='md'
        sx={{
          margin: '0 auto',
          height: '100vh',
        }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h4' textAlign='center'>
                {ctx.timezone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: 'yellow' }}>
            <CardContent>
              <Typography variant='h6' textAlign='center'>
                {'Sunrise: ' + ctx.toDate(ctx.currentDay.sunrise)}
                {' Sunset: ' + ctx.toDate(ctx.currentDay.sunset)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ color: 'white', backgroundColor: 'primary.dark' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <Typography variant='h2' textAlign='center'>
                {/* {ctx.currentDayMainWeather} */}
                {content}
              </Typography>
              <img src={iconSrc} alt={weather} height='100px' />
              <Typography textAlign='center'>
                {ctx.currentDay.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center' }}
        >
          <Button
            onClick={ctx.getForecast}
            variant='contained'
            size='large'
            color='success'
          >
            Fetch Forecast
          </Button>
        </Grid>
        <MeteoFooter />
      </Grid>
    </Fragment>
  );
}

export default App;
