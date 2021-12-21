import React from 'react';
// import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const MeteoItem = (props) => {
  return (
    <Card
      variant='outlined'
      sx={{ backgroundColor: 'primary.dark', padding: '0' }}
    >
      <CardContent>
        <Grid
          container
          direction='row'
          gap={0.5}
          alignItems='flex-end'
          justifyContent='center'
          color='white'
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

export default MeteoItem;
