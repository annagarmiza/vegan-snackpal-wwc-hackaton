import React from "react";
import { Typography, List, ListItem, Divider, Grid } from "@mui/material";

const SwapRules = () => {
  return (
    <Grid container justifyContent="center" sx={{ margin: 4 }}>
      <Grid item xs={11} md={10} lg={7}>
        <Typography variant="h4" color="primary">
          Plant-Based Snack Swap Rules
        </Typography>
        <List>
          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Eligibility:</span> To
              participate in the plant-based snack swap, you must be matched
              with a snackpal. Once you are matched, you have the opportunity to
              create a vegan snack package. 🌱🤝
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>
                Match Confirmation and Status Update:
              </span>{" "}
              As soon as you are matched with a snackpal, you have 3 days to
              confirm your participation by updating your status on the
              platform. If you do not update your status within this timeframe,
              your match will be discontinued. ⏰❌
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Package Creation:</span>{" "}
              After confirming your match, you have 7 days to curate and
              assemble your plant-based snack package. This package should
              include a minimum of 10 different vegan items. Be creative and
              make it a delightful experience for your snackpal! 📦🎁
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Tracking Number:</span> When
              you have created your package, it is mandatory to send the package
              with a tracking number. You must include the tracking number in
              your status update on the platform. This ensures transparency and
              allows both you and your snackpal to monitor the package's
              progress. 📬🚚
            </Typography>
          </ListItem>
          <Divider />

          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Enjoy Your Package:</span>{" "}
              Once you have received your snack package from your snackpal, it's
              time to enjoy! Try out the vegan treats and snacks, and savor the
              experience. 😋🍪
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>
              <span style={{ fontWeight: "bold" }}>
                Feedback and Gratitude:
              </span>
              After enjoying your plant-based snacks, it's important to provide
              feedback. Let your snackpal and the platform know how much you
              loved the items in the package. Sharing your appreciation and
              gratitude enhances the swapping experience for everyone. ❤️🙏
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default SwapRules;
