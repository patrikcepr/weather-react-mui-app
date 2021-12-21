import React, { Fragment, useContext } from 'react';

import MeteoFooter from './components/Layout/MeteoFooter';
import MeteoMain from './components/Layout/MeteoMain';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import { logEvent } from '@firebase/analytics';
import { analytics } from './firebaseConfig';

import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

import WeatherAppContext from './store/weatherAppContext';

function App() {
  // google analytics
  logEvent(analytics);

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

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Card
        // sx={{
        //   margin: '0 auto',
        //   height: { xs: '100vh', sm: 'auto' },
        // }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <CardHeader
                  // title={ctx.timezone}
                  title='Weather on Letná'
                  align='center'
                  sx={{
                    height: '10vh',
                    color: 'white',
                    backgroundColor: 'primary.dark',
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
                    'linear-gradient(to right, #2193b0, #6dd5ed)',
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
                  backgroundImage:
                    'linear-gradient(to right, #F09819, #FF512F)',
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
                <MeteoMain content={content} />
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
      </Container>
    </Fragment>
  );
}

export default App;
