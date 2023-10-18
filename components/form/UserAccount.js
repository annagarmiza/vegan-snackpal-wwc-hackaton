import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "next/image";

function UserAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API.
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      <Grid container justifyContent="center">
        <Image src="/snack_1_bagel.png" alt="Logo" width="200" height="180" />
      </Grid>
    </>
  );
}

export default UserAccount;
