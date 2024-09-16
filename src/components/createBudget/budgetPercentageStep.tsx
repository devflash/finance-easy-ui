import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { FormState, FormData } from "../../hooks/useForm";

import { InputNum } from "../common/inputNumber";
import { StepperNumberInput } from "../common/stepNumberInput";
import { Form, IFormContext } from "../common/form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormActions } from "../common/formActions";
import { StepWizardActions } from "../common/stepWizard/stepWizardActions";
import { useSearchIncomes } from "../../hooks/useSearchIncomes";
import { useMutation } from "@tanstack/react-query";
import { createBudget } from "../../services/budgetService";
import { useNavigate } from "react-router-dom";
import { BudgetData } from "../../utils/types";
import { BudgetState } from "./createBudget";
type IBudgetAllocation = {
  isExpectedAmount: boolean;
  expectedAmount: string;
  percentages: {
    needs: number;
    wants: number;
    savings: number;
  };
};

const initialState: FormState<IBudgetAllocation> = {
  data: {
    isExpectedAmount: false,
    expectedAmount: "",
    percentages: {
      needs: 0,
      wants: 0,
      savings: 0,
    },
  },
};

const formInputs: FormData<IBudgetAllocation> = {
  isExpectedAmount: {
    name: "isExpectedAmount",
    render: (state, onChange) => (
      <FormControlLabel
        control={
          <Checkbox
            name="isExpectedAmount"
            checked={state.data?.isExpectedAmount}
            inputProps={{ type: "checkbox" }}
            onChange={(e) => onChange(e)}
          />
        }
        label="I would like to create budget using the expected income"
      />
    ),
  },
  expectedAmount: {
    name: "expectedAmount",
    validation: [
      (state) => {
        if (
          state?.data?.isExpectedAmount &&
          (state?.data?.expectedAmount === undefined ||
            state?.data?.expectedAmount === "")
        ) {
          return "Expected amount is mandatory";
        }
        return "";
      },
      (state) => {
        if (
          state?.data?.isExpectedAmount &&
          Number(state?.data?.expectedAmount) < 0
        ) {
          return "Expected amount should be positive and greater than 0";
        }
        return "";
      },
    ],
    render: (state, onChange) => (
      <InputNum
        value={state.data?.expectedAmount}
        name="expectedAmount"
        label="Expected Amount"
        subLabelText="Please enter the amount you are expecting for the budget duaration"
        disabled={!state.data?.isExpectedAmount}
        onChange={onChange}
        required
        error={state?.errors?.expectedAmount?.isError}
        errorText="Expected amount is mandatory"
      />
    ),
  },
  needs: {
    name: "percentages.needs",
    validation: [
      (state) =>
        state?.data?.percentages.needs === 0
          ? "Needs percentage is mandatory"
          : "",
      (state) => {
        if (state?.data) {
          const { needs, savings, wants } = state.data.percentages;
          return needs + savings + wants > 100
            ? "The percentage sum should not exceed 100"
            : "";
        }
        return "";
      },
    ],
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.needs"
        min={0}
        max={100}
        error={state.errors?.percentages?.needs?.isError}
        errorText={state.errors?.percentages?.needs?.errorMessage}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
  wants: {
    name: "percentages.wants",
    validation: [
      (state) =>
        state?.data?.percentages.wants === 0
          ? "Wants percentage is mandatory"
          : "",
      (state) => {
        if (state?.data) {
          const { needs, savings, wants } = state.data.percentages;
          return needs + savings + wants > 100
            ? "The percentage sum should not exceed 100"
            : "";
        }
        return "";
      },
    ],
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.wants"
        min={0}
        max={100}
        error={state.errors?.percentages?.wants?.isError}
        errorText={state.errors?.percentages?.wants?.errorMessage}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
  savings: {
    name: "percentages.savings",
    validation: [
      (state) =>
        state?.data?.percentages.wants === 0
          ? "Wants percentage is mandatory"
          : "",
      (state) => {
        if (state?.data) {
          const { needs, savings, wants } = state.data.percentages;
          return needs + savings + wants > 100
            ? "The percentage sum should not exceed 100"
            : "";
        }
        return "";
      },
    ],
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.savings"
        min={0}
        max={100}
        error={state.errors?.percentages?.savings?.isError}
        errorText={state.errors?.percentages?.savings?.errorMessage}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
};

export const BudgetPercentageStep = ({ state }: { state: BudgetState }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      navigate("/budgets");
    },
  });

  const { budgetDetails } = state;
  const { startDate, endDate } = budgetDetails;
  const { data } = useSearchIncomes({ startDate, endDate });
  const totalIncome = data?.reduce((total, income) => total + income.amount, 0);

  const handleNext = (
    formState: IFormContext<IBudgetAllocation>["formState"],
    validation: IFormContext<IBudgetAllocation>["validation"]
  ) => {
    validation(
      () => {
        const budgetAmount = formState.data?.isExpectedAmount
          ? Number(formState.data?.expectedAmount)
          : totalIncome;
        const availableBudgetAmount = budgetAmount || 0;
        if (formState.data) {
          const payload: BudgetData = {
            budgetAllocation: {
              ...formState.data,
              expectedAmount: Number(formState.data.expectedAmount),
              availableBudgetAmount,
            },
            budgetDetails,
          };
          mutation.mutate(payload);
        }
      },
      () => {
        console.log(error);
      }
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "750px", margin: "30px auto 0" }}>
      <Form
        formInputs={formInputs}
        state={initialState}
        formActions={
          <FormActions<IBudgetAllocation>
            render={(formState, validation) => (
              <StepWizardActions
                onNextClick={() => handleNext(formState, validation)}
                onPrevClick={({ onPrev }) => onPrev()}
              />
            )}
          />
        }
        renderer={(formState, handleValueChange) => {
          const budgetAmount = formState.data?.isExpectedAmount
            ? Number(formState.data?.expectedAmount)
            : totalIncome;
          const availableBudgetAmount = budgetAmount || 0;

          const needsPercentage = formState.data?.percentages.needs
            ? formState.data?.percentages.needs / 100
            : 0;

          const wantsPercentage = formState.data?.percentages.wants
            ? formState.data?.percentages.wants / 100
            : 0;

          const savingsPercentage = formState.data?.percentages.savings
            ? formState.data?.percentages.savings / 100
            : 0;

          return (
            <>
              <Typography>
                {`Your total income for the selected budget dates is 2500`}
              </Typography>
              {formInputs.isExpectedAmount.render(formState, handleValueChange)}
              {formInputs.expectedAmount.render(formState, handleValueChange)}
              <Typography>
                Allocate percentage of selected income you want to spend on each
                of the following expense categories
              </Typography>
              <TableContainer component={Paper} sx={{ mt: "15px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Categories</TableCell>
                      <TableCell align="center">Percentage</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key="needs"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        Needs
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {formInputs.needs.render(formState, handleValueChange)}
                      </TableCell>
                      <TableCell align="center">
                        {Math.round(
                          availableBudgetAmount * needsPercentage * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key="needs"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        Wants
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {formInputs.wants.render(formState, handleValueChange)}
                      </TableCell>
                      <TableCell align="center">
                        {Math.round(
                          availableBudgetAmount * wantsPercentage * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key="needs"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        Savings
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {formInputs.savings.render(
                          formState,
                          handleValueChange
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {Math.round(
                          availableBudgetAmount * savingsPercentage * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          );
        }}
      ></Form>
    </Box>
  );
};
