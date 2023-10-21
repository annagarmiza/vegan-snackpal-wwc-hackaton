import React from "react";
import { Grid } from "@mui/material";
import InteractiveStepper from "./steps/InteractiveStepepr";
import ReadOnlyStepper from "./steps/ReadOnlyStepper";

const Status = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InteractiveStepper activeStep={0} />
      </Grid>
      <Grid item xs={6}>
        <ReadOnlyStepper activeStep={2} />
      </Grid>
    </Grid>
  );
};

export default Status;
