import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

const QandA = () => {
  return (
    <Grid container justifyContent="center" sx={{ margin: 4 }}>
      <Grid item xs={11} md={10} lg={6}>
        {/* Question 1 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              Q: A product says it may contain egg or milk, but there are none
              in the ingredients, is it vegan?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: Yes, it is vegan! The warning about the potential presence of
              egg or milk is likely due to the facility not being entirely free
              from allergens. If your pal has allergy restrictions, consider
              this before sharing it with them.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 2 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">
              Q: My pal is not responsive, what should I do?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: Our system monitors user responsiveness to maintain an engaging
              and responsible community. If a pal consistently doesn't respond
              within the set time limits, we may remove them from the community.
              If you encounter any issues, please reach out to our customer
              support at support@veganpackpal.com.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 3 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">
              Q: I don't have a match. What should I do?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: We're working diligently to find matches for everyone. Please
              be patient, and you'll be notified as soon as we find a suitable
              match for you. There are many pals out there, and we're doing our
              best to make meaningful connections.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 4 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography variant="h6">
              Q: My package never arrived, what should I do?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: We recommend tracking packages during the swapping process to
              avoid issues like this. If a package has been marked as sent but
              never arrives within a reasonable timeframe (e.g., 3 months),
              please contact us at support@veganpackpal.com, and we'll assist
              you in resolving the situation.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 5 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography variant="h6">
              Q: How can I ensure the safety and quality of the items I receive
              in a package swap?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: It's essential to maintain a trusted and responsible swapping
              community. You can take steps to ensure the safety and quality of
              items by thoroughly communicating it through your profile, setting
              preferences and any dietary restrictions, and setting clear
              expectations for the swap on the About Me section. Additionally,
              consider using tracking services for packages and following our
              guidelines for safe swapping practices.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Question 6 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography variant="h6">
              Q: What if I send a huge package and my pal sends a small one?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: We recommend sending exactly 10 items per package. Please be
              fair and respectful in your swaps. We trust our community to share
              their culture and snack experiences, so it's your opportunity to
              showcase your favorites. Remember, caring is sharing.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Question 7 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <Typography variant="h6">
              Q: Are gummies vegan if they don't contain eggs or dairy?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A: No, they are not considered vegan. While gummies may not
              contain eggs or dairy, many of them contain gelatin, which is
              derived from animal sources such as pig bones or fish bones.
              Gelatin is not considered vegan or vegetarian because it is a
              product of animal origin. To be truly vegan-friendly, gummies
              should be made without the use of gelatin and with alternative
              ingredients that align with vegan principles. 🌱🚫🐖🐟
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default QandA;
