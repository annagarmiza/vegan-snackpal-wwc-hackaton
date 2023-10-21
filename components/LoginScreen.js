// LoginScreen.js
import * as React from "react";
import styles from "../styles/ScreenLogin.module.css";
import { Grid, Container } from "@mui/material";
import PassageLogin from "./login";

export default function LoginScreen() {
  return (
    <Grid container spacing={2} className={styles.container}>
      <Grid item xs={12} md={7} className={styles.textSection}>
        <Container className={styles.text_container}>
          <h1>WELCOME</h1>
          <h2>
            Swap Local Plant-Based🌱 Secrets
            <br /> Try Global Flavors🌐✈️
            <br /> Meet Your <span style={{ color: "#78bd46" }}>Vegan </span>
            <span style={{ color: "#90d8f9" }}>Snack</span>
            <span style={{ color: "#db73c3" }}>Pal</span> Today!
          </h2>
        </Container>
      </Grid>
      <Grid item xs={12} md={5} className={styles.loginSection}>
        <PassageLogin />
      </Grid>
    </Grid>
  );
}
