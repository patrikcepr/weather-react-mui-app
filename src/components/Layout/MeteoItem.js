import React from 'react';
// import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import { Grid, Typography } from '@mui/material';

const MeteoItem = (props) => {
  return (
    <Grid
      container
      direction='column'
      gap={0.5}
      padding={1.4}
      paddingTop={2}
      paddingBottom={2}
      alignItems='center'
      justifyContent='center'
      color='white'
      backgroundColor='primary.dark'
    >
      <Grid item>{props.children}</Grid>
      <Grid item sx={{ display: { xs: 'none', sm: 'inline flex' } }}>
        <Typography sx={{ fontSize: { sm: 13, md: 16 } }} fontWeight='400'>
          {props.name}
        </Typography>
      </Grid>
      <Grid
        item
        container
        color='white'
        sx={{
          textAlign: 'center',
          fontSize: { xs: 18, sm: 23 },
          fontWeight: 500,
          display: { xs: 'inline flow', sm: 'block flow' },
          justifyContent: 'center',
        }}
      >
        {props.value} {props.unit}
      </Grid>
    </Grid>
  );
};

export default MeteoItem;
