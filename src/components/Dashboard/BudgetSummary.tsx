import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { categoryWiseBudget } from "../../mocks/jsons/dashboard1.json";

export const BudgetSummary = () => {
  return (
    <Paper
      sx={{
        marginTop: "1rem",
        padding: "1rem",

        flex: "1 1 48%",
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="h5" variant="h5">
            Budget
          </Typography>
          <Chip label="On Track" color="success" />
        </Box>
        <Box display="flex" justifyContent="center" gap="0.8rem">
          <Box>
            <Typography component="p" align="center">
              $1200
            </Typography>
            <Typography component="p">Budget Amount</Typography>
          </Box>
          <Box>
            <Typography component="p" align="center">
              $500
            </Typography>
            <Typography component="p">Actual Amount</Typography>
          </Box>
        </Box>
        <Box>
          <ResponsiveContainer height={500}>
            <BarChart
              width={500}
              height={300}
              data={categoryWiseBudget}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actualAmount" stackId="a" fill="#8884d8" />
              <Bar dataKey="budgetAmount" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};
