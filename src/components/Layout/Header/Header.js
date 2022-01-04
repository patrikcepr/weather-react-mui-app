import React, { Fragment, useContext } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import WeatherAppContext from '../../../store/weatherAppContext';

const Header = () => {
  const ctx = useContext(WeatherAppContext);

  return (
    <Fragment>
      <BottomNavigation
        xs={12}
        showLabels
        sx={{
          backgroundColor: '#222',
          backgroundImage:
            'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          marginBottom: '16px',
        }}
        onClick={ctx.getForecast}
      >
        <BottomNavigationAction
          label='Reload forecast'
          sx={{ color: '#fff' }}
          icon={<CloudDownloadOutlinedIcon />}
        />
      </BottomNavigation>
      {/* <Box
          sx={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            backgroundColor: 'primary.dark',
            padding: '16px',
          }}
        >
          <CloudDownloadOutlinedIcon />
          <Typography variant='inherit'>Reload forecast</Typography>
        </Box> */}
    </Fragment>
  );
};

export default Header;
