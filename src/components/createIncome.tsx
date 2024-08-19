import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { FormActions } from "./common/formActions";
import { useMutation } from "@tanstack/react-query";
import { createIncomes } from "../services/incomeService";
import { useNavigate } from "react-router-dom";
import { useForm, FormData, FormState } from "../hooks/useForm";
import { IncomeData } from "../utils/types";
type CreateIncomeProps = {
  action: "create" | "edit";
};

const initialState: FormState<IncomeData> = {
  data: {
    amount: "",
    category: "",
    depositType: "",
    description: "",
    incomeDate: "",
    source: "",
  },
  errors: {},
};

const formData: FormData<IncomeData> = {
  source: {
    name: "source",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        value={state.data.source}
        name="source"
        label="Income source"
        subLabelText="Please enter the source name from where the income is received"
        onChange={onChange}
        required
        error={state?.errors?.source}
        errorText={"Source is mandatory"}
      />
    ),
  },

  amount: {
    name: "amount",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        value={state.data.amount}
        name="amount"
        label="Amount"
        subLabelText="Please enter the received amout"
        type="number"
        onChange={onChange}
        required
        error={state?.errors?.amount}
        errorText={"Amount is mandatory"}
      />
    ),
  },
  depositType: {
    name: "depositType",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Select
        name="depositType"
        value={state.data.depositType}
        label="Deposite Type"
        subLabelText="Please select the type of deposite"
        options={[
          { label: "Cash", value: "cash" },
          { label: "Bank account", value: "bankAccount" },
        ]}
        required
        error={state?.errors?.depositType}
        errorText={"Deposite type is mandatory"}
        onChange={onChange}
      />
    ),
  },
  category: {
    name: "category",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Select
        name="category"
        value={state.data.category}
        label="Category"
        subLabelText="Please select the catehory of the income"
        options={[{ label: "Salary", value: "salary" }]}
        onChange={onChange}
        required
        error={state?.errors?.category}
        errorText={"Category is mandatory"}
      />
    ),
  },
  description: {
    name: "description",
    render: (state, onChange) => (
      <Input
        name="description"
        value={state.data.description}
        label="Notes"
        subLabelText="Please enter the short description about the income"
        multiline
        rows={4}
        maxRows={4}
        onChange={onChange}
      />
    ),
  },
  incomeDate: {
    name: "incomeDate",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        name="incomeDate"
        value={state.data.incomeDate}
        label="Income Date"
        subLabelText="Please select the date when the income is received"
        type="date"
        required
        error={state?.errors?.incomeDate}
        errorText={"Income date is mandatory"}
        onChange={onChange}
      />
    ),
  },
};

export const CreateIncome = ({ action }: CreateIncomeProps) => {
  const { formState, validation, handleValueChange } = useForm(
    formData,
    initialState
  );
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createIncomes,
    onSuccess: () => {
      navigate("/incomes");
    },
  });

  const createIncomeHandler = () => {
    validation(
      () => {
        mutation.mutate(formState.data);
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };

  const cancelHandler = () => navigate("/incomes");

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Add new Income
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Please provide the details about the income
      </Typography>
      <Box>
        {Object.values(formData).map((input) =>
          input.render(formState, handleValueChange)
        )}
      </Box>
      <FormActions
        submitBtnLabel="Create Income"
        submitBtnClick={createIncomeHandler}
        cancelBtnClick={cancelHandler}
      />
    </Paper>
  );
};
