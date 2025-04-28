import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Expenses } from "../components/expense/expenses";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../hooks/useGlobalState";
import { ExpenseFilter } from "../components/expense/expenseFilter";

export const ExpensePage = () => {
  const navigate = useNavigate();
  const { setOpenDialog } = useGlobalState();
  const handleCreateExpense = () => {
    navigate("/expense/create");
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1.5rem" }}
      >
        <Typography variant="h5" component="header">
          Expenses
        </Typography>
        <Box>
          <IconButton onClick={() => setOpenDialog(true)}>
            <FilterAltIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateExpense}
          >
            <AddIcon sx={{ mr: "0.5rem" }} />
            Create
          </Button>
        </Box>
      </Box>
      <ExpenseFilter />

      <Expenses />
    </>
  );
};
