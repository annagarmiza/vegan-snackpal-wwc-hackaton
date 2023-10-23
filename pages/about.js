import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const About = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={6} xl={5}>
        <Paper elevation={3} style={{ padding: "20px", margin: 20 }}>
          <Typography variant="h4" paragraph color="primary">
            About VeganPackPal
          </Typography>
          <Typography variant="body1" paragraph>
            VeganPackPal is all about connecting the world through snacks. 🌍🍪
            Imagine the excitement of waiting for a package filled with
            delicious, unique treats from another part of the globe, selected
            just for you. It's like having a pen pal, but with snacks! 📦🌏
          </Typography>
          <Typography variant="body1" paragraph>
            Our journey began with the challenge of finding vegan snacks in a
            foreign land. Often, vegan snacks lack clear labeling, making it
            tricky to determine their suitability. We also realized the wealth
            of knowledge within local vegan communities, but accessing it as a
            newcomer was overwhelming. 🌱🌎
          </Typography>
          {/* <Typography variant="body1" paragraph>
            Did you know? Changing to a plant-based diet not only benefits you
            but also significantly reduces your environmental impact. By going
            vegan, you can cut emissions by up to 28 percent, reduce land use by
            75 percent, and lower water pollution by about 60 percent.
          </Typography> */}
          <Typography variant="body1" paragraph>
            VeganPackPal is a delightful way to explore new flavors and
            traditions without harming animals. What makes us unique is the
            "snack pen pal" concept - sharing love-packed snack packages with
            others worldwide. It's an adventure of discovering new tastes,
            cultures, and friendships through snacks. 🌍🤝🍫
          </Typography>
          <Typography variant="body1">
            Join us in making the world a better place, one snack pack at a
            time! 🌱🌍🌟
          </Typography>
          <br />
          <Grid container justifyContent="center">
            <img
              src="https://media0.giphy.com/media/ukpwkOzk6kafXwfwbH/giphy.gif?cid=ecf05e47cmno5uqljvn1gurp1aaw3pkjpp50mr5ttitj2xhn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="Animated GIF"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default About;
