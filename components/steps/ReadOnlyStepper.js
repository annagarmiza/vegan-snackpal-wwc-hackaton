import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "SnackPal checked you out! 👀",
    description: `Your Pal has read your profile and now knows you exist! Give them some time to brainstorm the perfect surprise pack. If you don't see any progress within 3 days, we're here for you at support@vegansnackpal.com`,
  },
  {
    label: "Your SnackPal is Out Shopping for You 🛍️",
    description:
      "Your Pal has 7 days to shop, craft, and add a personal touch to your surprise package just for you! Isn't this special? If you don't see any progress within 7 days, we're here for you at support@vegansnackpal.com.",
  },
  {
    label: "It's On Its Way 📦 Package Sent",
    description: `OMGOMGOMG!! It's on its way!`,
  },
  {
    label: "Your Package Is Now in Their Hands! 🎉",
    description: `Your long-awaited package has finally made its way into your Pal's eager hands! It's time for them to experience the joy you've sent their way. Thank you for being a FREAKING AWESOME SNACKPAL!`,
  },
];

export default function ReadOnlyStepper({ activeStep }) {
  return (
    <>
      {/* <Box sx={{ maxWidth: 400 }}> */}
      <Paper
        elevation={3}
        sx={{ maxWidth: 500, paddingX: 4, paddingY: 2, marginX: 4, marginY: 4 }}
      >
        <Typography variant="h4" color="secondary">
          Pal's Snacktivity Status
        </Typography>
        <Stepper
          color="secondary"
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            color: "secondary",
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "secondary.dark", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "secondary.main", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              All steps completed - the process is finished
            </Typography>
          </Paper>
        )}
      </Paper>
    </>
  );
}
