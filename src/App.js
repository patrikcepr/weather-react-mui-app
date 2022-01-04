import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';
import MeteoMain from './components/Layout/MeteoMain';
import Header from './components/Layout/Header/Header';

import { logEvent } from '@firebase/analytics';
import { analytics } from './firebaseConfig';

import { CssBaseline, Container, Grid, Typography } from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';
import MeteoFutureFooter from './components/Layout/MeteoFutureFooter';

function App() {
  // google analytics
  logEvent(analytics);

  const ctx = useContext(WeatherAppContext);

  let content = <span>Data is loading....</span>;

  if (!ctx.isLoading && ctx.currentDay.weather.length > 0) {
    content = ctx.currentDayWeather;
  }

  if (!ctx.isLoading && ctx.currentDay.length === 0 && !ctx.error) {
    content = <span>No data received</span>;
  }

  if (ctx.error) {
    content = <span>{ctx.error}</span>;
  }

  return (
    <Fragment>
      <CssBaseline />
      <nav>
        <Header />
      </nav>
      <main>
        <Container maxWidth='xs' sx={{ paddingBlockEnd: '24px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant='h4'
                align='center'
                padding={2}
                sx={{
                  color: 'white',
                  backgroundColor: 'primary.dark',
                }}
              >
                {/* title={ctx.timezone} */}
                Weather on Letná
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              padding={0.5}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#2980B9' /* fallback for old browsers */,
                backgroundImage: 'linear-gradient(to right, #2193b0, #6dd5ed)',
              }}
            >
              <Typography
                variant='subtitle1'
                textAlign='center'
                sx={{
                  color: 'white',
                }}
              >
                {'Local Date & Time: ' + ctx.toDateTime(ctx.currentDay.dt)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              padding={0.5}
              sx={{
                background: '#FF512F' /* fallback for old browsers */,
                backgroundImage: 'linear-gradient(to right, #F09819, #FF512F)',
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
            <Grid item xs={12}>
              <MeteoMain margin={10} content={content} />
            </Grid>
            <Grid item xs={12}>
              <MeteoFooter />
            </Grid>
            <Grid item xs={12} container>
              <MeteoFutureFooter />
            </Grid>
          </Grid>
        </Container>
      </main>
    </Fragment>
  );
}

export default App;
