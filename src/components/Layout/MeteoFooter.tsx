import React, { useContext } from "react";
import MeteoItem from "./MeteoItem";

import { Box, Grid } from "@mui/material";

import windSpeedIco from "../../assets/svg/wind_speed.svg";
import humidityIco from "../../assets/svg/humidity.svg";

import WeatherAppContext from "../../store/weatherAppContext";

const MeteoFooter = () => {
  const ctx = useContext(WeatherAppContext);

  // choose temperature icon
  const temperature = Math.round(ctx.currentDay.temp);
  const tempIco = ctx.tempIcon(temperature);

  // wind speed
  const windSpeed = ctx.currentDay.wind_speed;

  // humidity
  const humidity = ctx.currentDay.humidity;

  return (
    <Grid container item>
      <Grid item xs={4}>
        <MeteoItem value={temperature} unit="°C" name="Temperature">
          <Box sx={{ height: { xs: "22px", sm: "30px" } }}>
            <img src={tempIco} alt="Temperature" style={{ height: "100%" }} />
          </Box>
        </MeteoItem>
      </Grid>
      <Grid item xs={4}>
        <MeteoItem value={windSpeed} unit="m/s" name="Wind">
          <Box sx={{ height: { xs: "22px", sm: "30px" } }}>
            <img
              src={windSpeedIco}
              alt="Wind Speed"
              style={{ height: "100%" }}
            />
          </Box>
        </MeteoItem>
      </Grid>
      <Grid item xs={4}>
        <MeteoItem value={humidity} unit="%" name="Humidity">
          <Box sx={{ height: { xs: "22px", sm: "30px" } }}>
            <img src={humidityIco} alt="Humidity" style={{ height: "100%" }} />
          </Box>
        </MeteoItem>
      </Grid>
    </Grid>
  );
};

export default MeteoFooter;
