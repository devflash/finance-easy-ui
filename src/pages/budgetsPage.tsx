import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Budgets } from "../components/budgets";
import { useNavigate } from "react-router-dom";

export const BudgetsPage = () => {
  const navigate = useNavigate();

  const handleCreateBudget = () => {
    navigate("/budget/create");
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1.5rem" }}
      >
        <Typography variant="h5" component="header">
          Budgets
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateBudget}
          >
            <AddIcon sx={{ mr: "0.5rem" }} />
            Create
          </Button>
        </Box>
      </Box>
      <Budgets />
    </>
  );
};
