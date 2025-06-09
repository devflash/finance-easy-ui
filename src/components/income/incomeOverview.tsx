import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  incomeByMonths,
  incomeByCategory,
} from "../../mocks/jsons/incomeOverview.json";

export const IncomeOverview = () => {
  return (
    <Box marginTop="1rem">
      <Typography variant="overline" component="p">
        Income Overview
      </Typography>
      <Box display="flex" gap="1rem" marginTop="1rem" alignItems="center">
        <ResponsiveContainer
          height={400}
          style={{
            borderRadius: "10px",
            boxShadow: "1px 2px 7px 0px",
            padding: "16px",
            flex: "1 1 70%",
          }}
        >
          <BarChart
            width={500}
            height={300}
            data={incomeByMonths}
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
            <Bar dataKey="value" fill="#112D4E" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          height={400}
          style={{
            borderRadius: "10px",
            boxShadow: "1px 2px 7px 0px",
            padding: "16px",
            flex: "1 1 30%",
          }}
        >
          <PieChart width={400} height={200}>
            <Legend
              align="right"
              verticalAlign="top"
              layout="vertical"
              height={36}
            />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={incomeByCategory}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
