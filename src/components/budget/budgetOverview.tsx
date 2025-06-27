import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data02 = [
  { name: "Need", value: 2400 },
  { name: "Want", value: 4567 },
  { name: "Saving", value: 1398 },
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[200],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#66bb6a",
    ...theme.applyStyles("dark", {
      backgroundColor: "#66bb6a",
    }),
  },
}));

export const BudgetOverview = () => {
  return (
    <Box>
      <Typography component="h4" variant="h4">
        Budget
        <Typography>01-01-2025 / 31-01-2025</Typography>
      </Typography>
      <Box display="flex" gap="1rem">
        <Box flex="1 1 65%">
          <Card />
          <Card />
          <Card />
        </Box>
        <Box flex="1 1 45%">
          <Box bgcolor="#fff" padding="1rem" borderRadius="10px">
            <Box
              textAlign="center"
              padding="25px 0"
              bgcolor="#cdf9ca"
              margin="1rem 0"
            >
              <Typography color="#008600">$100</Typography>
              <Typography color="#008600">Left to budget</Typography>
            </Box>
            <Typography textAlign="center">Budget Summary</Typography>

            <ResponsiveContainer height={200}>
              <PieChart width={200} height={200}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data02}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Card = () => {
  return (
    <Box bgcolor="#fff" padding="1rem" borderRadius="10px" marginBottom="1rem">
      <Typography component="p" fontSize="1.2rem">
        Clothing
      </Typography>
      <Typography component="p" fontSize="0.8rem" color="#818181">
        $100 left to spent
      </Typography>
      <Box marginTop="1rem">
        <BorderLinearProgress variant="determinate" value={20} />
        <Box display="flex" justifyContent="space-between" marginTop="0.5rem">
          <Typography fontSize="0.8rem" color="#818181">
            $250 Spent
          </Typography>
          <Typography fontSize="0.8rem" color="#818181">
            $350 Total budget
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
