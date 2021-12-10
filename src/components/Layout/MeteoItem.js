import React from 'react';
// import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const Temperature = (props) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid
          container
          direction='row'
          gap={0.5}
          alignItems='bottom'
          justifyContent='center'
          color='primary.main'
        >
          <Grid item>{props.children}</Grid>
          <Grid item sx={{ display: { xs: 'none', sm: 'inline flex' } }}>
            <Typography sx={{ fontSize: 18 }} fontWeight='400'>
              {props.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 500,
            display: { xs: 'inline flow', sm: 'block flow' },
          }}
        >
          {props.value} {props.unit}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Temperature;
