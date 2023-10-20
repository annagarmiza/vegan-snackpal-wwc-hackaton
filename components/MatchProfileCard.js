import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const MatchProfileCard = ({
  name,
  address,
  aboutMe,
  preferences,
  restrictions,
  userImage,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={name}
        height="100"
        image={userImage} // Provide the URL for the user's image
      />
      <CardContent>
        <Typography variant="h6">Meet {name}!</Typography>
        <Typography variant="body2" color="textSecondary">
          Who lives at {address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          They want you to know: {aboutMe}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          They have preferences for: {preferences}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Restrictions: {restrictions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MatchProfileCard;
