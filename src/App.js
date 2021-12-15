import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import {
  Button,
  CssBaseline,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';

import './App.css';

// import letnaEarlySummer from './assets/img/letna_EarlySummer.jpg';
import letnaWinterNoSnow from './assets/img/letnaWinterNoSnow.jpg';

function App() {
  const ctx = useContext(WeatherAppContext);

  let content = <span>Data is loading....</span>;

  if (!ctx.isLoading && ctx.currentDay.weather.length > 0) {
    content = ctx.currentDayMainWeather;
  }

  if (!ctx.isLoading && ctx.currentDay.length === 0 && !ctx.error) {
    content = <span>No data received</span>;
  }

  if (ctx.error) {
    content = <span>{ctx.error}</span>;
  }

  // get weather type to choose the icon
  let weather = ctx.currentDayMainWeather;
  console.log(weather);

  console.log(ctx.night);
  // set the right icon
  let iconSrc = ctx.assignWeatherIcon(weather, ctx.night);

  return (
    <Fragment>
      <CssBaseline />
      <Card>
        <CardContent>
          <Grid
            container
            maxWidth='md'
            sx={{
              margin: '0 auto',
              // height: '100vh',
            }}
          >
            <Grid item xs={12}>
              <CardHeader
                title={ctx.timezone}
                sx={{
                  height: '10vh',
                  backgroundColor: 'primary.light',
                  textAlign: 'center',
                }}
              />
              <CloudDownloadIcon />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: '5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.dark',
              }}
            >
              <Typography
                variant='subtitle1'
                textAlign='center'
                // paddingTop={0.8}
                sx={{
                  color: 'white',
                }}
              >
                {'Local Time: ' + ctx.toDateTime(ctx.currentDay.dt)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              // padding={0.3}
              sx={{
                height: '5vh',
                backgroundColor: 'yellow',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <Typography variant='subtitle1' textAlign='center'>
                {'Sunrise: ' + ctx.toTime(ctx.currentDay.sunrise)}
              </Typography>
              <Typography variant='subtitle1' textAlign='center'>
                {' Sunset: ' + ctx.toTime(ctx.currentDay.sunset)}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ height: '55vh' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                  justifyContent: 'space-evenly',
                  background: `linear-gradient(35deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${letnaWinterNoSnow})`,
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
                    {content}
                  </Typography>
                  <img src={iconSrc} alt={weather} height='180px' />
                  <Typography variant='h5' textAlign='center' paddingTop={1}>
                    {ctx.currentDay.weather[0].description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: '5vh',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={ctx.getForecast}
                variant='contained'
                size='large'
                color='primary'
              >
                Fetch Forecast
              </Button>
            </Grid>
            <MeteoFooter sx={{ height: '15vh' }} />
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default App;
