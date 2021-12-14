import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';

import {
  Button,
  CssBaseline,
  Grid,
  Card,
  CardHeader,
  // CardMedia,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';

import './App.css';
// import { Image } from '@mui/icons-material';

import letnaLetoImg from './assets/img/letna_leto.jpg';

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

  let weather = ctx.currentDayMainWeather;
  console.log(weather);
  let iconSrc = ctx.assignWeatherIcon(weather);

  console.log(iconSrc);

  return (
    <Fragment>
      <CssBaseline />
      <Card>
        <CardContent>
          <Grid
            container
            maxWidth='sm'
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
                  backgroundColor: 'lightgrey',
                  textAlign: 'center',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: '5vh',
                padding: '5',
                backgroundColor: 'yellow',
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Typography variant='h6' textAlign='center'>
                {'Sunrise: ' + ctx.toDate(ctx.currentDay.sunrise)}
              </Typography>
              <Typography variant='h6' textAlign='center'>
                {' Sunset: ' + ctx.toDate(ctx.currentDay.sunset)}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ height: '60vh' }}>
              <Card
                sx={{
                  color: 'white',
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  backgroundColor: 'primary.dark',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                {/* <CardMedia
                  component='img'
                  height='200'
                  image={letnaLetoImg}
                  alt='Letná v létě'
                /> */}
                {/* <Paper
                  elevation={3}
                  sx={{
                    backgroundImage: { letnaLetoImg },
                    backgroundColor: 'rgba(0,0,0,0.5',
                  }}
                > */}
                <CardContent>
                  <Typography variant='h2' textAlign='center'>
                    {/* {ctx.currentDayMainWeather} */}
                    {content}
                  </Typography>
                  <img src={iconSrc} alt={weather} height='200px' />
                  <Typography textAlign='center'>
                    {ctx.currentDay.weather[0].description}
                  </Typography>
                </CardContent>
                {/* </Paper> */}
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                height: '5vh',
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
