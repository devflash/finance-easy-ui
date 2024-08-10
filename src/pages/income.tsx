import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../services/incomeService";

export const IncomePage = () => {
  const { data } = useQuery({ queryKey: ["incomes"], queryFn: getIncomes });

  return (
    <Box>
      <Typography variant="h5" component="header">
        Incomes
        {data?.map((income) => (
          <li key={income._id}>{income.source}</li>
        ))}
      </Typography>
    </Box>
  );
};
