import React from "react";
import UserAccount from "../components/form/UserAccount";
import { Grid } from "@mui/material";

const Account = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <UserAccount />
      </Grid>
    </Grid>
  );
};

export default Account;
