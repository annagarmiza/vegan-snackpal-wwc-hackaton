import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { countries } from "../../assets/countries";
import Grid from "@mui/material/Grid";
import useInput from "../../utils/use-input";
import { validAddress, validPostCode, validMobile } from "../../assets/regex";
import { useState } from "react";

const AddressInfo = ({ onStepValidityChange }) => {
  const [enteredCountry, setEnteredCountry] = useState("");
  const [isCountryFieldTouched, setIsCountryFieldTouched] = useState(false);
  const [enteredProvince, setEnteredProvince] = useState("");
  const [provinceInputHasError, setProvinceInputHasError] = useState(false);

  const isFormValid = () => {
    const isValid =
      enteredCountry &&
      enteredAddressIsValid &&
      enteredPostcodeIsValid &&
      enteredMobileIsValid;
    const obj = {
      country: enteredCountry,
      address: enteredAddress,
      state: enteredProvince,
      postcode: enteredPostcode,
      mobile: enteredMobile,
    };
    //send this one to the parent with the final valid object
    onStepValidityChange(isValid, obj);
  };

  const countryChangeHandler = (event, value) => {
    setIsCountryFieldTouched(false);
    if (value !== null) {
      setEnteredCountry(value.label);
    } else {
      setIsCountryFieldTouched(true);
    }
  };

  const countryBlurHandler = (event) => {
    if (enteredCountry === "") {
      setIsCountryFieldTouched(true);
    }
    isFormValid();
  };

  const provinceChangeHandler = (event) => {
    const value = event.target.value;
    setEnteredProvince(value);
    setProvinceInputHasError(false);
    if (value !== "" && !validAddress.test(value))
      setProvinceInputHasError(true);

    const mobileChangeHandler = (event) => {};
  };

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    errorMessage: addressErrorMessage,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your address" };
    }
    if (!validAddress.test(value)) {
      return {
        error: false,
        errorMessage: "Address should include English letters and numbers only",
      };
    } else {
      return { error: true, errorMessage: "" };
    }
  });

  const {
    value: enteredPostcode,
    isValid: enteredPostcodeIsValid,
    errorMessage: postcodeErrorMessage,
    hasError: postcodeInputHasError,
    valueChangeHandler: postcodeChangedHandler,
    inputBlurHandler: postcodeBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your postcode" };
    }
    if (!validPostCode.test(value)) {
      return {
        error: false,
        errorMessage:
          "Postcode should include English letters and numbers only",
      };
    } else {
      return { error: true, errorMessage: "" };
    }
  });

  const {
    value: enteredMobile,
    isValid: enteredMobileIsValid,
    errorMessage: mobileErrorMessage,
    hasError: mobileInputHasError,
    valueChangeHandler: mobileChangedHandler,
    inputBlurHandler: mobileBlurHandler,
    //reset: resetNameInput,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { error: false, errorMessage: "Please enter your mobile number" };
    }
    if (!validMobile.test(value)) {
      return {
        error: false,
        errorMessage:
          "Mobile should include 10 digit number , no country prefix is required",
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
        backgroundColor: "#fafafa",
        padding: 2,
        height: "380px",
      }}
    >
      <Grid container justifyContent="center" rowSpacing={2}>
        <Grid item xs={12} md={8}>
          <Autocomplete
            //fullWidth={true}
            //value={enteredCountry}
            id="country-select-demo"
            sx={{ width: "100%" }}
            options={countries}
            //onChange={(event, value) => console.log(value.label)}
            onChange={countryChangeHandler}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                label="Your Country"
                onBlur={countryBlurHandler}
                error={isCountryFieldTouched}
                helperText={
                  isCountryFieldTouched
                    ? "Please select a country from the list"
                    : ""
                }
                // onChange={countryChangedHandler}
                //onBlur={countryBlurHandler}
                // inputValue={enteredCountry}
                // error={countryInputHasError}
                //helperText={countryInputHasError ? countryErrorMessage : ""}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="address"
            label="Street"
            variant="outlined"
            onChange={addressChangedHandler}
            onBlur={handleBlurValidation}
            value={enteredAddress}
            error={addressInputHasError}
            helperText={addressInputHasError ? addressErrorMessage : ""}
            inputProps={{ maxLength: 95 }}
            multiline
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="province"
            label="County/Province/State"
            placeholder="Optional"
            variant="outlined"
            onChange={provinceChangeHandler}
            //onBlur={provinceBlurHandler}
            value={enteredProvince}
            error={provinceInputHasError}
            helperText={
              provinceInputHasError
                ? "Field should include English letters and numbers only"
                : ""
            }
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="postcode"
            label="Postcode"
            variant="outlined"
            onChange={postcodeChangedHandler}
            onBlur={handleBlurValidation}
            value={enteredPostcode}
            error={postcodeInputHasError}
            helperText={postcodeInputHasError ? postcodeErrorMessage : ""}
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="mobile"
            type="number"
            onInput={(e) => {
              e.target.value = e.target.value.toString().slice(0, 10);
            }}
            //min={-1}
            label="Mobile"
            variant="outlined"
            value={enteredMobile}
            onChange={mobileChangedHandler}
            //onChange={mobileChangeHandler}
            onBlur={handleBlurValidation}
            error={mobileInputHasError}
            helperText={mobileInputHasError ? mobileErrorMessage : ""}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AddressInfo;
