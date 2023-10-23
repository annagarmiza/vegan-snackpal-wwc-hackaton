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
  // const {
  //   userPassageIdData,
  //   userPreferencesData,
  //   userRestrictionsData,
  //   about_me,
  //   address,
  //   country,
  //   email,
  //   id,
  //   image_url,
  //   mobile,
  //   name,
  //   preferences,
  //   restrictions,
  // } = matchInfo;
  console.log("match_info", matchInfo);
  const {
    about_me,
    address,
    country,
    email,
    id,
    image_url,
    mobile,
    name,
    restrictions,
    preferences,
  } = matchInfo;

  // const restrictions = matchInfo.userRestrictionsData;
  // console.log("restcrions", restrictions);
  // const preferences = matchInfo.userPreferencesData;

  // console.log("MATCH INFO", matchInfo);

  const countryCode = countries
    .find((countryItem) => countryItem.label == country)
    .code.toLowerCase();

  return (
    <Card
      elevation={15}
      sx={{ marginX: 4, marginY: 4 }}
      className={[styles.background, styles.card].join(" ")}
    >
      <div className={styles.leftTopImageContainer}>
        <img height="100px" src={`stamp.png`} alt="Stamp Image" />
      </div>

      <Grid container alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <CardMedia
            className={styles.cardItem}
            component="img"
            alt={name}
            image={image_url}
            style={{
              borderRadius: "5px",
              maxHeight: "400px",
              maxWidth: "400px",
            }}
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
                alt={country}
              />
              {country}!
              <Typography variant="subtitle1" color="textSecondary">
                {name} wants you to know: <br />
                <span className={styles.highlight}>{about_me}</span>
              </Typography>
            </div>
            {preferences.length > 0 && (
              <Typography variant="subtitle1" color="textSecondary">
                They refer to themselves as:
                <br />
                {preferences.map((preference, index) => (
                  <Chip
                    color="secondary"
                    variant="outlined"
                    key={preference.id}
                    label={preference.name}
                    className={styles.chip}
                  />
                ))}
              </Typography>
            )}
            {restrictions.length > 0 && (
              <Typography variant="subtitle1" color="textSecondary">
                Please considerate their food restrictions <br />
                {restrictions.map((restriction, index) => (
                  <Chip
                    color="error"
                    variant="outlined"
                    key={restriction.id}
                    label={restriction.name}
                    className={styles.chip}
                  />
                ))}
              </Typography>
            )}
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ fontWeight: "bold" }}
            >
              Send your package to: <br /> {address}, {country}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MatchProfileCard;
