import { useReducer } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StepWizard, IStep } from "../common/stepWizard/stepWizard";
import { BudgetDetailsStep } from "./budgetDetailsStep";
import { BudgetPercentageStep } from "./budgetPercentageStep";
const initialState = {
  budgetDetails: {
    startDate: "",
    endDate: "",
    budgetName: "",
  },
  budgetAllocation: {},
};

export type BudgetState = typeof initialState;
const getControls = (
  state: BudgetState,
  dispatch: React.Dispatch<BudgetState>
) => {
  const steps: IStep[] = [
    {
      key: "budget_details",
      stepLabel: "Budget Details",
      render: () => <BudgetDetailsStep dispatch={dispatch} />,
    },
    {
      key: "budget_allocation_percentage",
      stepLabel: "Budget Allocation (%)",
      render: () => <BudgetPercentageStep state={state} />,
    },
  ];
  return steps;
};

export const CreateBudget = () => {
  const [state, dispatch] = useReducer<React.Reducer<BudgetState, BudgetState>>(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Create new Budget
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Create a budget to efficiently manage expenses
      </Typography>
      <Box
        sx={{ margin: "20px auto 0 auto", width: "100%", maxWidth: "950px" }}
      >
        <StepWizard steps={getControls(state, dispatch)} />
      </Box>
    </Paper>
  );
};
