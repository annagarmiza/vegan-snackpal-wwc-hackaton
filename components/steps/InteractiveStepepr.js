import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const steps = [
  {
    step: 0,
    label: "Met Your Pal's Profile!",
    description: `Your Pal knows that you know, that they know, that you know! Click 'Continue' to let them know you're moving to the next step. Just a friendly reminder, you've got 3 days to keep the excitement going!`,
  },
  {
    step: 1,
    label: "Craft a snack-tastic surprise for your Pal",
    description:
      "You have 7 days to complete this step. It's time to start collecting the ultimate surprise box for your Pal! Think about their preferences and any restrictions they may have. Get creative with a personal note and perhaps some fun stickers? We trust you to make it special!",
  },
  {
    step: 2,
    label: "Ship the box to your Pal 📦✈️",
    description: `For this step, we only accept tracked packages! Before you hit 'Continue,' make sure to input your tracking number for the pack. Your Pal is thrilled and can't sit still with excitement!`,
  },
  {
    step: 3,
    label: "Pal's snack pack is in your hands! 🎁🍫",
    description: `Now that you're holding it, show your Pal your appreciation. You can reach out to them via email. Here's their email address – let them know!`,
  },
];

export default function InteractiveStepper({ activeStep, onPressNext }) {
  const [_localStep, setActiveStep] = React.useState(activeStep);
  const localStep = activeStep;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    onPressNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ maxWidth: 500, paddingX: 4, paddingY: 2, marginX: 4, marginY: 4 }}
      >
        <Typography variant="h4" color="primary">
          Your SnackTracker
        </Typography>
        <Stepper activeStep={localStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {localStep === 2 ? (
                  <TextField
                    label="Tracking Number"
                    variant="outlined"
                    fullWidth
                  />
                ) : null}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    {/* <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button> */}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {localStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button> */}
          </Paper>
        )}
      </Paper>
    </>
  );
}
