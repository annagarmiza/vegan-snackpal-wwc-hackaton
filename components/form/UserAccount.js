import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import { Grid, Paper, Button, Typography, Divider } from "@mui/material";
import PasskeyTable from "../PassageTable";

function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Initial Text"); // You can initialize with your desired text.
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "Anna",
      email: "",
    },
    address: {
      street: "",
      city: "",
    },
    preferences: {
      favoriteColor: "",
    },
    accountSettings: {
      username: "",
      password: "",
    },
  });



  const handleChange = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // You can save the edited text or perform other actions here.
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <form onSubmit={() => {}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Divider
              textAlign="left"
              color="secondary"
              style={{ marginBottom: "5px" }}
            >
              Personal Info
            </Divider>
            <TextField
              label="First Name"
              variant="filled"
              value={formData.personalInfo.name}
              onChange={(e) =>
                handleChange("personalInfo", "name", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="filled"
              value={formData.personalInfo.name}
              onChange={(e) =>
                handleChange("personalInfo", "name", e.target.value)
              }
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              variant="filled"
              value={formData.personalInfo.email}
              onChange={(e) =>
                handleChange("personalInfo", "email", e.target.value)
              }
              fullWidth
            />

            <Divider
              textAlign="left"
              style={{ marginTop: "20px", marginBottom: "5px" }}
            >
              Address
            </Divider>
            <TextField
              label="Country"
              variant="filled"
              value={formData.address.street}
              onChange={(e) =>
                handleChange("address", "country", e.target.value)
              }
              fullWidth
            />

            <TextField
              label="Address"
              variant="filled"
              value={formData.address.street}
              onChange={(e) =>
                handleChange("address", "address", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="County/Province/State"
              variant="filled"
              value={formData.address.city}
              onChange={(e) => handleChange("address", "state", e.target.value)}
              fullWidth
            />
            <TextField
              label="Postcode"
              variant="filled"
              value={formData.address.city}
              onChange={(e) =>
                handleChange("address", "postcode", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Mobile"
              variant="filled"
              value={formData.address.city}
              onChange={(e) =>
                handleChange("address", "mobile", e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Divider textAlign="left" style={{ marginBottom: "5px" }}>
              Preferences
            </Divider>
            <TextField
              label="About Me"
              variant="filled"
              value={formData.preferences.favoriteColor}
              onChange={(e) =>
                handleChange("preferences", "about_me", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Snack Preferences"
              variant="filled"
              value={formData.preferences.favoriteColor}
              onChange={(e) =>
                handleChange("preferences", "snack_preferences", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Food Restrictions"
              variant="filled"
              value={formData.preferences.favoriteColor}
              onChange={(e) =>
                handleChange("preferences", "food_restrictions", e.target.value)
              }
              fullWidth
            />

            <Divider
              textAlign="left"
              style={{ marginTop: "20px", marginBottom: "5px" }}
            >
              Account Settings
            </Divider>
            <PasskeyTable />

            <Divider />
            <Grid container justifyContent="center" spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                >
                  Submit Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default UserAccount;
