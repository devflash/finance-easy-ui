import { useReducer } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { FormActions } from "./common/formActions";
import { IIncome } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { createIncomes } from "../services/incomeService";
import { useNavigate } from "react-router-dom";

type CreateIncomeProps = {
  action: "create" | "edit";
};

type IncomeData = Record<
  keyof Omit<IIncome, "_id" | "userId" | "createdAt" | "updateAt">,
  string
>;

type Errors = Partial<Record<keyof IncomeData, boolean>>;
type formState = {
  data: IncomeData;
  errors: Errors;
};
const InitialState: formState = {
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

type IAction =
  | {
      type: "UPDATE_VALUES";
      payload: {
        key: string;
        value: string;
      };
    }
  | {
      type: "UPDATE_ERROR";
      payload: Errors;
    };

const reducer = (state: formState, action: IAction) => {
  switch (action.type) {
    case "UPDATE_VALUES": {
      const { key, value } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [key]: value,
        },
      };
    }
    case "UPDATE_ERROR": {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const CreateIncome = ({ action }: CreateIncomeProps) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createIncomes,
    onSuccess: () => {
      navigate("/incomes");
    },
  });
  const [formState, dispatch] = useReducer(reducer, InitialState);

  const validation = (
    successFn: () => void,
    errorFn: (error: Errors) => void
  ) => {
    const errors: Errors = {};
    if (formState.data.source === "") {
      errors.source = true;
    }
    if (formState.data.amount === "") {
      errors.amount = true;
    }
    if (formState.data.category === "") {
      errors.category = true;
    }
    if (formState.data.depositType === "") {
      errors.depositType = true;
    }
    if (formState.data.incomeDate === "") {
      errors.incomeDate = true;
    }
    if (!Object.keys(errors).length) {
      successFn();
    } else {
      dispatch({ type: "UPDATE_ERROR", payload: errors });
      errorFn(errors);
    }
  };

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

  const cancelHandler = () => {};

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_VALUES", payload: { key: name, value } });
    dispatch({ type: "UPDATE_ERROR", payload: { [name]: false } });
  };

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Add new Income
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Please provide the details about the income
      </Typography>
      <Box>
        <Input
          value={formState.data.source}
          name="source"
          label="Income source"
          subLabelText="Please enter the source name from where the income is received"
          onChange={handleValueChange}
          required
          error={formState.errors.source}
          errorText={"Source is mandatory"}
        />
        <Input
          value={formState.data.amount}
          name="amount"
          label="Amount"
          subLabelText="Please enter the received amout"
          type="number"
          onChange={handleValueChange}
          required
          error={formState.errors.amount}
          errorText={"Amount is mandatory"}
        />
        <Select
          name="depositType"
          value={formState.data.depositType}
          label="Deposite Type"
          subLabelText="Please select the type of deposite"
          options={[
            { label: "Cash", value: "cash" },
            { label: "Bank account", value: "bankAccount" },
          ]}
          required
          error={formState.errors.depositType}
          errorText={"Deposite type is mandatory"}
          onChange={handleValueChange}
        />
        <Select
          name="category"
          value={formState.data.category}
          label="Category"
          subLabelText="Please select the catehory of the income"
          options={[{ label: "Salary", value: "salary" }]}
          onChange={handleValueChange}
          required
          error={formState.errors.category}
          errorText={"Category is mandatory"}
        />
        <Input
          name="description"
          value={formState.data.description}
          label="Notes"
          subLabelText="Please enter the short description about the income"
          multiline
          rows={4}
          maxRows={4}
          onChange={handleValueChange}
        />
        <Input
          name="incomeDate"
          value={formState.data.incomeDate}
          label="Income Date"
          subLabelText="Please select the date when the income is received"
          type="date"
          required
          error={formState.errors.incomeDate}
          errorText={"Income date is mandatory"}
          onChange={handleValueChange}
        />
      </Box>
      <FormActions
        submitBtnLabel="Create Income"
        submitBtnClick={createIncomeHandler}
        cancelBtnClick={cancelHandler}
      />
    </Paper>
  );
};
