import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { topSpendings } from "../../mocks/jsons/dashboard.json";

export const TopSpendings = () => {
  return (
    <Paper sx={{ marginTop: "1rem", flex: "1 1 48%" }}>
      <List
        sx={{
          width: "100%",

          bgcolor: "background.paper",
          mt: "1rem",
          borderRadius: "10px",
        }}
      >
        <Typography component="h5" variant="h5" paddingLeft="1rem">
          Top Spendings
        </Typography>
        {topSpendings.map((expense, id) => (
          <Box key={expense._id}>
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
                      Housing
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {new Date(expense.date).toISOString().split("T")[0]}
                      </Typography>
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "red", fontSize: "1rem" }}
                    >
                      {expense.amount}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {id < topSpendings.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </List>
    </Paper>
  );
};
