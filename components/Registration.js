import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddressInfo from "./form/AddressInfo";
import PersonalInfo from "./form/PersonalInfo";
import PreferencesInfo from "./form/PreferencesInfo";
import Image from "next/image";

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Hello There! Don't be a stanger 😉",
    "Your Address for the snackings 📮",
    "Customize your preferences 🦋",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfo></PersonalInfo>;
      case 1:
        return <AddressInfo></AddressInfo>;
      case 2:
        return <PreferencesInfo></PreferencesInfo>;
      default:
        return "Unknown";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ backgroundColor: "#1ecbe1", p: 2 }}
          >
            🇮‌🇳‌ 🇯‌🇺‌🇸‌🇹‌ 3 🇪‌🇦‌🇸‌🇾‌-🇵‌🇪‌🇦‌🇸‌🇾‌ 🇸‌🇹‌🇪‌🇵‌🇸‌,
            🇺‌🇳‌🇱‌🇴‌🇨‌🇰‌ 🇦‌ 🇼‌🇴‌🇷‌🇱‌🇩‌ 🇴‌🇫‌
            🇵‌🇱‌🇦‌🇳‌🇹‌-🇧‌🇦‌🇸‌🇪‌🇩‌
            🇩‌🇪‌🇱‌🇮‌🇨‌🇮‌🇴‌🇺‌🇸‌🇳‌🇪‌🇸‌🇸‌
            <br /> ᴄᴀᴜꜱᴇ ɢɪᴠɪɴɢ ɪꜱ ʀᴇᴄᴇɪᴠɪɴɢ. ʟɪᴛᴇʀᴀʟʟʏ.
          </Typography>
        </Grid>
      </Grid>

      <form>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <Stepper activeStep={activeStep} sx={{ p: 2 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <div>
                <Typography variant="h6" align="center">
                  All steps completed - you're finished
                </Typography>
              </div>
            ) : (
              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </form>
      <Grid container justifyContent="center">
        <Image src="/snack_3_cracker.png" alt="Logo" width="400" height="220" />
      </Grid>
    </Fragment>
  );
};
export default Registration;
