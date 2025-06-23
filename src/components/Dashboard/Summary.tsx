import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export const Summary = () => {
  return (
    <Paper>
      <List
        sx={{
          width: "100%",

          bgcolor: "background.paper",
          mt: "1rem",
          borderRadius: "10px",
        }}
      >
        <Typography component="h5" variant="h5" paddingLeft="1rem">
          Summary
        </Typography>

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
                  Total transactions
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  50
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
                  Maximum Income
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  1987
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
                  Minimum Income
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  10
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
                  Average Income
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  100
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
                  Maximum Expense
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  1000
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
                  Minimum Expense
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  1098
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
                  Maximum Saving
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: "1rem" }}
                >
                  100
                </Typography>
              </Box>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
};
