import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { countries } from "@/assets/countries";
import { useEffect } from "react";
import styles from "./../styles/MatchProfileCard.module.css";

const MatchProfileCard = ({ matchInfo }) => {
  const {
    name,
    address,
    user_country,
    recieved_packages,
    sent_packages,
    aboutMe,
    preferences,
    restrictions,
    userImage,
  } = matchInfo;

  console.log(user_country);
  const countryCode = countries
    .find((country) => country.label == user_country)
    .code.toLowerCase();

  return (
    <Card elevation={15} className={[styles.background, styles.card].join(" ")}>
      <div className={styles.leftTopImageContainer}>
        <img height="100px" src={`stamp.png`} alt="Stamp Image" />
      </div>

      <Grid container alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <CardMedia
            className={styles.cardItem}
            component="img"
            alt={name}
            image={userImage}
            style={{ borderRadius: "5px" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CardContent className={styles.cardItem}>
            <div className={styles.imageContainer}>
              <Typography variant="h5">
                Meet <span className={styles.highlight1}>{name}</span> from
              </Typography>
              <img
                width="140"
                height="80"
                className={styles.flagImage}
                src={`https://flagcdn.com/112x84/${countryCode}.png`}
                alt={user_country}
              />
              {user_country}!
              <Typography variant="subtitle1" color="textSecondary">
                {name} wants you to know: <br />
                <span className={styles.highlight}>{aboutMe}</span>
              </Typography>
            </div>
            <Typography variant="subtitle1" color="textSecondary">
              They refer to themselves as:
              <br />
              {preferences.map((preference, index) => (
                <Chip
                  color="secondary"
                  variant="outlined"
                  key={index}
                  label={preference}
                  className={styles.chip}
                />
              ))}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Please considerate their food restrictions <br />
              {restrictions.map((restriction, index) => (
                <Chip
                  color="error"
                  variant="outlined"
                  key={index}
                  label={restriction}
                  className={styles.chip}
                />
              ))}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ fontWeight: "bold" }}
            >
              Send your package to: <br /> {address}, {user_country}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MatchProfileCard;
