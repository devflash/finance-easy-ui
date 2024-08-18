import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Incomes } from "../components/incomes";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../hooks/useGlobalState";
import { IncomeFilter } from "../components/incomeFilter";
export const IncomePage = () => {
  const navigate = useNavigate();
  const { setOpenDialog } = useGlobalState();
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
        <Box>
          <IconButton onClick={() => setOpenDialog(true)}>
            <FilterAltIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateIncome}
          >
            <AddIcon sx={{ mr: "0.5rem" }} />
            Create
          </Button>
        </Box>
      </Box>
      <IncomeFilter />
      <Incomes />
    </>
  );
};
