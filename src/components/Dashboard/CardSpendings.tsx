import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export const CardSpendings = () => {
  return (
    <Box marginTop="1rem">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Cards</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", fontSize: "1rem" }}
                    >
                      Credit Card Ending 1987
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Credit
                      </Typography>
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontSize: "1rem" }}
                    >
                      1298
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", fontSize: "1rem" }}
                    >
                      Debit card ending 18776
                      <Typography sx={{ fontSize: "0.8rem" }}>Debit</Typography>
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontSize: "1rem" }}
                    >
                      199
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
