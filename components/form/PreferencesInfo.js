import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createClient } from "@supabase/supabase-js";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { snackPreferences } from "../../assets/snack-preferences";
import { snackRestrictions } from "../../assets/snack-restrictions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { getSupabase } from "@/utils/supabase";

const Input = styled("input")({
  display: "none",
});

const PreferencesInfo = ({ onStepValidityChange }) => {
  const [enteredAboutMe, setEnteredAboutMe] = useState("");
  const [enteredSnackPref, setEnteredSnackPref] = useState([]);
  const [enteredRestrictPref, setEnteredRestrictPref] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const isFormValid = () => {
    const obj = {
      about_me: enteredAboutMe,
      snack_preferences: enteredSnackPref,
      snack_restrictions: enteredRestrictPref,
      image_url: selectedFile,
    };
    onStepValidityChange(true, obj);
  };
  useEffect(() => {
    isFormValid();
  }, [enteredSnackPref, enteredRestrictPref, selectedFile]);

  const onChangeSnackPref = (value) => {
    setEnteredSnackPref([...value]);
  };

  const onChangeRestrictPref = (value) => {
    setEnteredRestrictPref([...value]);
  };

  const fileSelectedHandler = async (event) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
    console.log("THIS IS THE IMG", event.target.files[0]);

    // const fileBlob = new Blob([event.target.files[0]], {
    //   type: selectedFile.type,
    // });

    // const { data, error } = await supabase.storage
    //   .from("snackPalStorage")
    //   .upload(event.target.files[0].name, fileBlob);
    // if (error) {
    //   console.error("Error uploading image:", error);
    // } else {
    //   console.log("Image uploaded successfully");
    //   console.log("Image URL:", data.Location);
    // }
  };

  const fileUploadHandler = async (event) => {
    // const supabase = getSupabase();
    // const { data, error } = await supabase.storage
    //   .from("snackPalStorage")
    //   .upload(selectedFile);
    // if (error) {
    //   console.error("Error uploading image:", error);
    // } else {
    //   console.log("Image uploaded successfully");
    //   console.log("Image URL:", data.Location);
    // }
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
        {/* <Grid item xs={12} md={8}>
          <FormControlLabel
            control={<Switch />}
            label="No Country Preferences"
          />
        </Grid> */}

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="About me"
            multiline
            rows={4}
            onBlur={() => isFormValid("about")}
            placeholder="Give your SnackPal a glance to your inner world! ✨&#10;(E.g: 'I love lizards🦎 and gamblimg🎰')&#10;This will show on your profile as a short description"
            onChange={(e) => setEnteredAboutMe(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <FormControlLabel
            control={
              <Switch
                checked={showSnackPreferences}
                onChange={() => setShowSnackPreferences(!showSnackPreferences)}
              />
            }
            label="No Snack Preferences"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showFoodRestrictions}
                onChange={() => setShowFoodRestrictions(!showFoodRestrictions)}
              />
            }
            label="No Food Restrictions"
          /> */}
          <div id="selected-snacks">
            <Autocomplete
              multiple
              id="tags-filled"
              options={snackPreferences.map((snack) => snack)}
              // defaultValue={}
              onChange={(_, newValue) => onChangeSnackPref(newValue)} // Update selected items
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="secondary"
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Add Snack Preferences (Optional)"
                  // placeholder="Add Snack Preferences"
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div id="selected-restrictions">
            <Autocomplete
              multiple
              id="tags-filled"
              options={snackRestrictions.map((restriction) => restriction)}
              // defaultValue={}
              onChange={(_, newValue) => onChangeRestrictPref(newValue)} // Update selected items
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="error"
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Add Food Restrictions (Optional)"
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div id="upload-photo">
            {/* Label for the contained-button-file input */}
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload Profile Photo
              </Button>
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={fileSelectedHandler}
              />
            </label>
            {/* Label for the icon-button-file input */}
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={fileSelectedHandler}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PreferencesInfo;
