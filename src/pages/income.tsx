import Typography from "@mui/material/Typography";
import { Incomes } from "../components/incomes";
export const IncomePage = () => {
  return (
    <>
      <Typography variant="h5" component="header">
        Incomes
      </Typography>
      <Incomes />
    </>
  );
};
