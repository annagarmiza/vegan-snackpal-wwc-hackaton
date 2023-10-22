import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import styles from "../styles/MatchStarter.module.css";
import api, { generateMatch } from "../utils/api";
const MatchStarter = () => {
  function handleMatchMaker() {
    generateMatch("HGknGaRQ4gvQInMh2adLAMrB").then((res) => {
      console.log("result", res);
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // width: "100vw", // Set a minimum height to center the content vertically
      }}
    >
      <div className={styles.skyback}>
        <Typography variant="h1" align="center" color="whitesmoke">
          <span>MATCH MAKING</span>
        </Typography>
      </div>
      <Typography variant="h4" align="center" style={{ margin: "20px" }}>
        Don't Keep Your SnackPal Waiting
        <br />
        Get The SWAPPING Started!
      </Typography>
      <Grid conrainer justifyContent="center" align="center">
        <button onClick={handleMatchMaker} className={styles.button}>
          MATCH ME!
        </button>
      </Grid>
    </Box>
  );
};

export default MatchStarter;
