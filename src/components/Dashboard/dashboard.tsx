import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "./Card";
import {
  Legend,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { incomesVsExpenses } from "../../mocks/jsons/dashboard.json";
export const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" component="header">
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Card title="Total Income" amount={5000} />
        <Card title="Total Expense" amount={4000} />
        <Card title="Total Savings" amount={1000} />
        <Card title="Net Worth" amount={6000} />
      </Box>

      <Box display="flex" marginTop="1rem">
        <ResponsiveContainer
          width="90%"
          height={200}
          style={{
            borderRadius: "10px",
            boxShadow: "1px 2px 7px 0px",
            padding: "16px",
          }}
        >
          <LineChart
            width={500}
            height={300}
            data={incomesVsExpenses}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="iv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="ev" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
