import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { FormActions } from "./common/formActions";
import { useMutation } from "@tanstack/react-query";
import { createIncomes } from "../services/incomeService";
import { useNavigate } from "react-router-dom";
import { FormData, FormState } from "../hooks/useForm";
import { IncomeData } from "../utils/types";
import { Form, IFormContext } from "./common/form";
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
    validation: [
      (state) => (state?.data?.source === "" ? "Source is mandatory" : ""),
    ],
    render: (state, onChange) => (
      <Input
        value={state.data?.source}
        name="source"
        label="Income source"
        subLabelText="Please enter the source name from where the income is received"
        onChange={onChange}
        required
        error={state?.errors?.source?.isError}
        errorText={state?.errors?.source?.errorMessage}
      />
    ),
  },

  amount: {
    name: "amount",
    validation: [
      (state) => (state?.data?.amount === "" ? "Amount is mandatory" : ""),
      (state) =>
        Number(state?.data?.amount) < 0 ? "Amount should be positive" : "",
    ],
    render: (state, onChange) => (
      <Input
        value={state.data?.amount}
        name="amount"
        label="Amount"
        subLabelText="Please enter the received amout"
        type="number"
        onChange={onChange}
        required
        error={state?.errors?.amount?.isError}
        errorText={state?.errors?.amount?.errorMessage}
      />
    ),
  },
  depositType: {
    name: "depositType",
    validation: [
      (state) =>
        state?.data?.depositType === "" ? "Deposite type is mandatory" : "",
    ],
    render: (state, onChange) => (
      <Select
        name="depositType"
        value={state.data?.depositType}
        label="Deposite Type"
        subLabelText="Please select the type of deposite"
        options={[
          { label: "Cash", value: "cash" },
          { label: "Bank account", value: "bankAccount" },
        ]}
        required
        error={state?.errors?.depositType?.isError}
        errorText={state?.errors?.depositType?.errorMessage}
        onChange={onChange}
      />
    ),
  },
  category: {
    name: "category",
    validation: [
      (state) => (state?.data?.category === "" ? "Category is mandatory" : ""),
    ],
    render: (state, onChange) => (
      <Select
        name="category"
        value={state.data?.category}
        label="Category"
        subLabelText="Please select the catehory of the income"
        options={[{ label: "Salary", value: "salary" }]}
        onChange={onChange}
        required
        error={state?.errors?.category?.isError}
        errorText={state?.errors?.category?.errorMessage}
      />
    ),
  },
  description: {
    name: "description",
    render: (state, onChange) => (
      <Input
        name="description"
        value={state.data?.description}
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
    validation: [
      (state) =>
        state?.data?.incomeDate === "" ? "Income date is mandatory" : "",
    ],
    render: (state, onChange) => (
      <Input
        name="incomeDate"
        value={state.data?.incomeDate}
        label="Income Date"
        subLabelText="Please select the date when the income is received"
        type="date"
        required
        error={state?.errors?.incomeDate?.isError}
        errorText={state?.errors?.incomeDate?.errorMessage}
        onChange={onChange}
      />
    ),
  },
};

export const CreateIncome = ({ action }: CreateIncomeProps) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createIncomes,
    onSuccess: () => {
      navigate("/incomes");
    },
  });

  const createIncomeHandler = (
    formState: IFormContext<IncomeData>["formState"],
    validation: IFormContext<IncomeData>["validation"]
  ) => {
    validation(
      () => {
        if (formState.data) mutation.mutate(formState.data);
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
        <Form
          formInputs={formData}
          state={initialState}
          formActions={
            <FormActions<IncomeData>
              submitBtnLabel="Create Income"
              submitBtnClick={createIncomeHandler}
              cancelBtnClick={cancelHandler}
            />
          }
        />
      </Box>
    </Paper>
  );
};
