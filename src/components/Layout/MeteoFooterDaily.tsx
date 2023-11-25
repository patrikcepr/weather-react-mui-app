import React from 'react';
import { Grid } from '@mui/material';

const MeteoFooterDaily = (props) => {
  return (
    <Grid
      item
      padding={2}
      xs={4}
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontWeight: '500',
        backgroundColor: 'primary.light',
        paddingBottom: '24px',
      }}
    >
      {props.children}
    </Grid>
  );
};

export default MeteoFooterDaily;
