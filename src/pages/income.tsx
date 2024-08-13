import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Incomes } from "../components/incomes";
import { useNavigate } from "react-router-dom";

export const IncomePage = () => {
  const navigate = useNavigate();
  const handleCreateIncome = () => {
    navigate("/income/create");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1.5rem" }}
      >
        <Typography variant="h5" component="header">
          Incomes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateIncome}
        >
          <AddIcon sx={{ mr: "0.5rem" }} />
          Create
        </Button>
      </Box>
      <Incomes />
    </>
  );
};
