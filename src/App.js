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
      <Grid
        container
        maxWidth='md'
        sx={{
          margin: '0 auto',
          // height: '100vh',
        }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h3' textAlign='center'>
                {ctx.timezone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ color: 'white', backgroundColor: 'primary.dark' }}>
            <CardContent>
              <Typography variant='h2' textAlign='center'>
                {ctx.currentDayMainWeather}
                {/* {content} */}
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
