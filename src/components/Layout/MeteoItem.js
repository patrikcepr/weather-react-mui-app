import React from 'react';
// import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const Temperature = (props) => {
  return (
    <Card variant='outlined' sx={{ backgroundColor: 'primary.dark' }}>
      <CardContent>
        <Grid
          container
          direction='row'
          gap={0.3}
          alignItems='bottom'
          justifyContent='center'
          color='white'
          // sx={{ padding: '0px' }}
        >
          <Grid item>{props.children}</Grid>
          <Grid item sx={{ display: { xs: 'none', sm: 'inline flex' } }}>
            <Typography sx={{ fontSize: 18 }} fontWeight='400'>
              {props.name}
            </Typography>
          </Grid>
          <Grid
            item
            container
            color='white'
            sx={{
              textAlign: 'center',
              fontSize: { xs: 15, sm: 23 },
              fontWeight: 500,
              display: { xs: 'inline flow', sm: 'block flow' },
              justifyContent: 'center',
            }}
          >
            {props.value} {props.unit}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Temperature;
