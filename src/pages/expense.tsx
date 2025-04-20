import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Expenses } from "../components/expense/expenses";
export const ExpensePage = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1.5rem" }}
      >
        <Typography variant="h5" component="header">
          Expenses
        </Typography>
        <Box>
          <IconButton>
            <FilterAltIcon />
          </IconButton>
          <Button variant="contained" color="primary">
            <AddIcon sx={{ mr: "0.5rem" }} />
            Create
          </Button>
        </Box>
      </Box>
      <Expenses />
    </>
  );
};
