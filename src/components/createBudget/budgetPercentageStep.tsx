import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { FormState, FormData } from "../../hooks/useForm";
import { Input } from "../common/input";
import { StepperNumberInput } from "../common/stepNumberInput";
import { Form } from "../common/form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormActions } from "../common/formActions";
import { StepWizardActions } from "../common/stepWizard/stepWizardActions";
type IBudgetAllocation = {
  isExpectedAmount: boolean;
  expectedAmount: number;
  percentages: {
    needs: number;
    wants: number;
    savings: number;
  };
};

const initialState: FormState<IBudgetAllocation> = {
  data: {
    isExpectedAmount: false,
    expectedAmount: 0,
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
            onChange={onChange}
          />
        }
        label="I would like to create budget using the expected income"
      />
    ),
  },
  expectedAmount: {
    name: "expectedAmount",
    render: (state, onChange) => (
      <Input
        value={state.data?.expectedAmount}
        name="expectedAmount"
        label="Expected Amount"
        subLabelText="Please enter the amount you are expecting for the budget duaration"
        disabled={!state.data?.isExpectedAmount}
        onChange={onChange}
        required
        error={state?.errors?.expectedAmount}
        errorText="Expected amount is mandatory"
      />
    ),
  },
  needs: {
    name: "percentages.needs",
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.needs"
        min={0}
        max={100}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
  wants: {
    name: "percentages.wants",
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.wants"
        min={0}
        max={100}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
  savings: {
    name: "percentages.savings",
    render: (state, onChange) => (
      <StepperNumberInput
        name="percentages.needs"
        min={0}
        max={100}
        onStepperInputChange={(value, e) => onChange(e, value)}
      />
    ),
  },
};

const handleNext = () => {};

export const BudgetPercentageStep = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "750px", margin: "30px auto 0" }}>
      <Form
        formInputs={formInputs}
        state={initialState}
        formActions={
          <FormActions<IBudgetAllocation>
            render={(formState, validation) => (
              <StepWizardActions
                onNextClick={({ onNext }) =>
                  handleNext(formState, validation, onNext)
                }
                onPrevClick={({ onPrev }) => onPrev()}
              />
            )}
          />
        }
        renderer={(formState, handleValueChange) => (
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
                    <TableCell align="center">100</TableCell>
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
                    <TableCell align="center">100</TableCell>
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
                      {formInputs.savings.render(formState, handleValueChange)}
                    </TableCell>
                    <TableCell align="center">100</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      ></Form>
    </Box>
  );
};
