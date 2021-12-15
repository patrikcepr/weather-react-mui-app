import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';
import MeteoMain from './components/Layout/MeteoMain';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';

import './App.css';

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
  // comment out for real life
  console.log(weather);

  // comment out for real life
  console.log(ctx.night);
  // set the right icon
  let iconSrc = ctx.assignWeatherIcon(weather, ctx.night);

  return (
    <Fragment>
      <CssBaseline />
      <Card
        sx={{
          margin: '0 auto',
          height: '100vh',
        }}
      >
        <CardContent>
          <Grid container maxWidth='sm'>
            <Grid item xs={12}>
              <CardHeader
                title={ctx.timezone}
                sx={{
                  height: '10vh',
                  color: 'white',
                  backgroundColor: 'primary.dark',
                  textAlign: 'center',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: '5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#2980B9' /* fallback for old browsers */,
                backgroundImage:
                  'linear-gradient(to right, #2193b0, #6dd5ed)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
              }}
            >
              <Typography
                variant='subtitle1'
                textAlign='center'
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
              sx={{
                height: '5vh',
                background: '#FF512F' /* fallback for old browsers */,
                // background: '-webkit-linear-gradient(to right, #F09819, #FF512F)',  /* Chrome 10-25, Safari 5.1-6 */
                backgroundImage:
                  'linear-gradient(to right, #F09819, #FF512F)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
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
            <Grid item xs={12} sx={{ height: '50vh' }}>
              <MeteoMain content={content} icon={iconSrc} weather={weather} />
            </Grid>
            <Grid item xs={12}>
              <MeteoFooter sx={{ height: '10vh' }} />
            </Grid>
            <Grid item xs={12} sx={{ height: '10vh' }}>
              <BottomNavigation
                xs={12}
                showLabels
                sx={{
                  backgroundColor: '#222',
                  backgroundImage:
                    'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                }}
                onClick={ctx.getForecast}
              >
                <BottomNavigationAction
                  label='Reload forecast'
                  sx={{ color: '#fff' }}
                  icon={<CloudDownloadOutlinedIcon />}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default App;
