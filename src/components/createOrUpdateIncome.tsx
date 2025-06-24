import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomInput } from "./common/inputNew";

import { CustomSelect } from "./common/select";
import { FormActions } from "./common/formActions";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
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
      <CustomInput
        value={state.data?.source}
        name="source"
        label="Income source"
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
      <CustomInput
        value={state.data?.amount}
        name="amount"
        label="Amount"
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
      <CustomSelect
        name="depositType"
        value={state.data?.depositType}
        label="Deposite Type"
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
      <CustomSelect
        name="category"
        value={state.data?.category}
        label="Category"
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
      <CustomInput
        name="description"
        value={state.data?.description}
        label="Notes"
        multiline
        rows={4}
        maxRows={4}
        onChange={onChange}
      />
    ),
  },
  date: {
    name: "date",
    validation: [
      (state) => (state?.data?.date === "" ? "Income date is mandatory" : ""),
    ],
    render: (state, onChange) => (
      <CustomInput
        name="date"
        value={state.data?.date}
        label="Income Date"
        type="date"
        required
        error={state?.errors?.date?.isError}
        errorText={state?.errors?.date?.errorMessage}
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
      date: "",
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
      date: data?.date ? new Date(data.date).toISOString().split("T")[0] : "",
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
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
