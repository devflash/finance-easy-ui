import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { FormActions } from "./common/formActions";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createIncomes, updateIncomes } from "../services/incomeService";
import { useNavigate } from "react-router-dom";
import { FormData, FormState } from "../hooks/useForm";
import { IIncome, IncomeData } from "../utils/types";
import { Form, IFormContext } from "./common/form";
import { useGetIncomeById } from "../hooks/income/useGetIncomeById";
import { useParams } from "react-router-dom";

type CreateIncomeProps = { action: "CREATE" | "UPDATE" };

type IncomeFormProps = {
  initialState: FormState<IncomeData>;
  action: CreateIncomeProps["action"];
  mutationFn: (
    payload: { income: IncomeData } | { income: IncomeData; incomeId: string }
  ) => Promise<IIncome>;
  onFormConfirm: (
    formState: IFormContext<IncomeData>["formState"],
    validation: IFormContext<IncomeData>["validation"],
    mutation: UseMutationResult<
      IIncome,
      Error,
      | {
          income: IncomeData;
        }
      | {
          income: IncomeData;
          incomeId: string;
        },
      unknown
    >
  ) => void;
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

export const CreateOrUpdateIncome = ({ action }: CreateIncomeProps) => {
  return action === "CREATE" ? <CreateIncome /> : <UpdateIncome />;
};

const CreateIncome = () => {
  const initialState = {
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

  const createIncomeHandler = (
    formState: IFormContext<IncomeData>["formState"],
    validation: IFormContext<IncomeData>["validation"],
    mutation: UseMutationResult<
      IIncome,
      Error,
      | {
          income: IncomeData;
        }
      | {
          income: IncomeData;
          incomeId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data) mutation.mutate({ income: formState.data });
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };
  return (
    <IncomeForm
      initialState={initialState}
      action="CREATE"
      mutationFn={createIncomes}
      onFormConfirm={createIncomeHandler}
    />
  );
};

const UpdateIncome = () => {
  const { incomeId } = useParams();
  const { data, isLoading } = useGetIncomeById(incomeId ? incomeId : "");
  console.log(data);
  const initialState = {
    data: {
      source: data?.source || "",
      amount: String(data?.amount) || "",
      category: data?.category || "",
      depositType: data?.depositType || "",
      description: data?.description || "",
      incomeDate: data?.incomeDate
        ? new Date(data.incomeDate).toISOString().split("T")[0]
        : "",
    },
    errors: {},
  };

  const updateIncomeHandler = (
    formState: IFormContext<IncomeData>["formState"],
    validation: IFormContext<IncomeData>["validation"],
    mutation: UseMutationResult<
      IIncome,
      Error,
      | {
          income: IncomeData;
        }
      | {
          income: IncomeData;
          incomeId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data)
          mutation.mutate({ income: formState.data, incomeId });
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (!data) {
    return <p>{`No income with id ${incomeId} available`}</p>;
  }

  return (
    <IncomeForm
      initialState={initialState}
      action="UPDATE"
      mutationFn={updateIncomes}
      onFormConfirm={updateIncomeHandler}
    />
  );
};

const IncomeForm = ({
  initialState,
  action,
  mutationFn,
  onFormConfirm,
}: IncomeFormProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      navigate("/incomes");
    },
  });

  const cancelHandler = () => navigate("/incomes");

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        {action === "CREATE" ? "Add new Income" : "Update Income"}
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
              submitBtnClick={(formState, validation) =>
                onFormConfirm(formState, validation, mutation)
              }
              cancelBtnClick={cancelHandler}
            />
          }
        />
      </Box>
    </Paper>
  );
};
