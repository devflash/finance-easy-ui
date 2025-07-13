import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const PaymentMethods = () => {
  return (
    <Paper sx={{ marginTop: "1rem", padding: "1rem", flex: "1 1 48%" }}>
      <Typography component="h5" variant="h5">
        Payment Methods
      </Typography>
      <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography>Bank</Typography>
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
                  ICICI Bank
                  <Typography sx={{ fontSize: "0.8rem" }}>Savings</Typography>
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
                  ICICI Bank
                  <Typography sx={{ fontSize: "0.8rem" }}>Savings</Typography>
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
      </List>
      <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography>Card</Typography>

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
                  <Typography sx={{ fontSize: "0.8rem" }}>Credit</Typography>
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
    </Paper>
  );
};
