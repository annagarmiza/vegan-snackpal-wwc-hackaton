import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useInput from "../../utils/use-input";
import { validName, validEmail } from "../../assets/regex";

const PersonalInfo = ({ onStepValidityChange }) => {
  const isFormValid = () => {
    // Check if the form is valid
    // Replace this with your form validation logic

    const isValid =
      enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    const obj = {
      name: enteredName,
      lastName: enteredLastName,
      email: enteredEmail,
    };
    //send this one to the parent with the final valid object
    onStepValidityChange(isValid, obj);
  };

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    errorMessage: nameErrorMessage,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your name" };
    }
    if (!validName.test(value)) {
      return {
        error: false,
        errorMessage:
          "Name should be more than 1 character, English letters only",
      };
    } else {
      return { error: true, errorMessage: "" };
    }
  });

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    errorMessage: lastNameErrorMessage,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your last name" };
    }
    if (!validName.test(value)) {
      return {
        error: false,
        errorMessage:
          "Last Name should be more than 1 character, English letters only",
      };
    } else {
      return { error: true, errorMessage: "" };
    }
  });

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    errorMessage: emailErrorMessage,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your email" };
    }
    if (!validEmail.test(value)) {
      return {
        error: false,
        errorMessage: "Invalid email, please fix",
      };
    } else {
      return { error: true, errorMessage: "" };
    }
  });

  const handleBlurValidation = () => {
    isFormValid(); // Call isFormValid when a field blurs
  };

  return (
    <Box
      sx={{
        //   flexGrow: 1,
        backgroundColor: "#fafafa",
        padding: 2,
        height: "380px",
        //   width: "90vh",
      }}
    >
      <Grid container justifyContent="center" rowSpacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="first-name"
            label="First Name"
            variant="outlined"
            onChange={nameChangedHandler}
            onBlur={handleBlurValidation}
            value={enteredName}
            defaultValue={enteredName}
            error={nameInputHasError}
            helperText={nameInputHasError ? nameErrorMessage : ""}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="last-name"
            label="Last Name"
            variant="outlined"
            onChange={lastNameChangedHandler}
            onBlur={handleBlurValidation}
            value={enteredLastName}
            defaultValue={enteredLastName}
            error={lastNameInputHasError}
            helperText={lastNameInputHasError ? lastNameErrorMessage : ""}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={emailChangedHandler}
            onBlur={handleBlurValidation}
            value={enteredEmail}
            defaultValue={enteredEmail}
            error={emailInputHasError}
            helperText={emailInputHasError ? emailErrorMessage : ""}
            inputProps={{ maxLength: 62 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default PersonalInfo;
