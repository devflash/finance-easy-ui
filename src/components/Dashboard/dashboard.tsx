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
import { networth } from "../../mocks/jsons/dashboard.json";
import { TopSpendings } from "./TopSpendings";
import { Summary } from "./Summary";
import { BudgetSummary } from "./BudgetSummary";
import { PaymentMethods } from "./PaymentMethods";
export const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" component="header">
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Card title="Total Income" amount={5000} />
        <Card title="Total Expense" amount={4000} />
        <Card title="Total Savings" amount={1000} />
        <Card title="Net Worth" amount={6000} />
      </Box>
      <Box display="flex" marginTop="1rem" flexWrap="wrap">
        <ResponsiveContainer
          width="100%"
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
            data={networth}
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
            <Line dataKey="nw" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down(990)]: {
            flexDirection: "column",
          },
        })}
        display="flex"
        gap="1rem"
        flexWrap="wrap"
      >
        <BudgetSummary />
        <Summary />
        <TopSpendings />
        <PaymentMethods />
      </Box>
    </Box>
  );
};

//  {/* Income vs savings */}
//       <Box display="flex" marginTop="1rem">
//         <ResponsiveContainer
//           width="90%"
//           height={200}
//           style={{
//             borderRadius: "10px",
//             boxShadow: "1px 2px 7px 0px",
//             padding: "16px",
//           }}
//         >
//           <LineChart
//             width={500}
//             height={300}
//             data={incomesVsExpenses}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="iv"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//             <Line type="monotone" dataKey="ev" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>
//       {/* Savings vs Expenses */}
//       <Box display="flex" marginTop="1rem">
//         <ResponsiveContainer
//           width="90%"
//           height={200}
//           style={{
//             borderRadius: "10px",
//             boxShadow: "1px 2px 7px 0px",
//             padding: "16px",
//           }}
//         >
//           <LineChart
//             width={500}
//             height={300}
//             data={savingsVsExpense}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="sv"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//             <Line type="monotone" dataKey="ev" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>
