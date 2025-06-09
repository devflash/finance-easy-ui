import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "../common/input";
import { Select } from "../common/select";
import { FormActions } from "../common/formActions";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { createExpenses, updateExpenses } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";
import { FormData, FormState } from "../../hooks/useForm";
import { IExpense, ExpenseData } from "../../utils/types";
import { Form, IFormContext } from "../common/form";
import { useGetExpenseById } from "../../hooks/expense/useGetExpenseById";
import { useParams } from "react-router-dom";

type CreateExpenseProps = { action: "CREATE" | "UPDATE" };

type ExpenseFormProps = {
  initialState: FormState<ExpenseData>;
  action: CreateExpenseProps["action"];
  mutationFn: (
    payload:
      | { expense: ExpenseData }
      | { expense: ExpenseData; expenseId: string }
  ) => Promise<IExpense>;
  onFormConfirm: (
    formState: IFormContext<ExpenseData>["formState"],
    validation: IFormContext<ExpenseData>["validation"],
    mutation: UseMutationResult<
      IExpense,
      Error,
      | {
          expense: ExpenseData;
        }
      | {
          expense: ExpenseData;
          expenseId: string;
        },
      unknown
    >
  ) => void;
};

const formData: FormData<ExpenseData> = {
  moneyPaidTo: {
    name: "moneyPaidTo",
    validation: [
      (state) =>
        state?.data?.moneyPaidTo === "" ? "Recipient name is mandatory" : "",
    ],
    render: (state, onChange) => (
      <Input
        value={state.data?.moneyPaidTo}
        name="moneyPaidTo"
        label="Recipient Name"
        subLabelText="Please enter the Recipient's name"
        onChange={onChange}
        required
        error={state?.errors?.moneyPaidTo?.isError}
        errorText={state?.errors?.moneyPaidTo?.errorMessage}
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
        subLabelText="Please enter the amout sent"
        type="number"
        onChange={onChange}
        required
        error={state?.errors?.amount?.isError}
        errorText={state?.errors?.amount?.errorMessage}
      />
    ),
  },
  depositType: {
    name: "paymentMethod",
    validation: [
      (state) =>
        state?.data?.paymentMethod === ""
          ? "Payment method type is mandatory"
          : "",
    ],
    render: (state, onChange) => (
      <Select
        name="paymentMethod"
        value={state.data?.paymentMethod}
        label="Payment Method"
        subLabelText="Please select the Payment method type"
        options={[
          { label: "Cash", value: "cash" },
          { label: "Bank account", value: "bankAccount" },
        ]}
        required
        error={state?.errors?.paymentMethod?.isError}
        errorText={state?.errors?.paymentMethod?.errorMessage}
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
        options={[
          { label: "Grocery", value: "grocery" },
          { label: "Light Bill", value: "lightBill" },
        ]}
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
  date: {
    name: "date",
    validation: [
      (state) => (state?.data?.date === "" ? "Expense date is mandatory" : ""),
    ],
    render: (state, onChange) => (
      <Input
        name="date"
        value={state.data?.date}
        label="Income Date"
        subLabelText="Please select the date when the expense is made"
        type="date"
        required
        error={state?.errors?.date?.isError}
        errorText={state?.errors?.date?.errorMessage}
        onChange={onChange}
      />
    ),
  },
};

export const CreateOrUpdateExpense = ({ action }: CreateExpenseProps) => {
  return action === "CREATE" ? <CreateExpense /> : <UpdateExpense />;
};

const CreateExpense = () => {
  const initialState = {
    data: {
      category: "",
      moneyPaidTo: "",
      paymentMethod: "",
      amount: "",
      date: "",
      description: "",
    },
    errors: {},
  };

  const createExpenseHandler = (
    formState: IFormContext<ExpenseData>["formState"],
    validation: IFormContext<ExpenseData>["validation"],
    mutation: UseMutationResult<
      IExpense,
      Error,
      | {
          expense: ExpenseData;
        }
      | {
          expense: ExpenseData;
          expenseId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data) mutation.mutate({ expense: formState.data });
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };
  return (
    <ExpenseForm
      initialState={initialState}
      action="CREATE"
      mutationFn={createExpenses}
      onFormConfirm={createExpenseHandler}
    />
  );
};

const UpdateExpense = () => {
  const { expenseId } = useParams();
  const { data, isLoading } = useGetExpenseById(expenseId ? expenseId : "");
  console.log(data);
  const initialState = {
    data: {
      moneyPaidTo: data?.moneyPaidTo || "",
      amount: String(data?.amount) || "",
      category: data?.category || "",
      paymentMethod: data?.paymentMethod || "",
      description: data?.description || "",
      date: data?.date ? new Date(data.date).toISOString().split("T")[0] : "",
    },
    errors: {},
  };

  const updateIncomeHandler = (
    formState: IFormContext<ExpenseData>["formState"],
    validation: IFormContext<ExpenseData>["validation"],
    mutation: UseMutationResult<
      IExpense,
      Error,
      | {
          expense: ExpenseData;
        }
      | {
          expense: ExpenseData;
          expenseId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data)
          mutation.mutate({ expense: formState.data, expenseId });
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
    return <p>{`No income with id ${expenseId} available`}</p>;
  }

  return (
    <ExpenseForm
      initialState={initialState}
      action="UPDATE"
      mutationFn={updateExpenses}
      onFormConfirm={updateIncomeHandler}
    />
  );
};

const ExpenseForm = ({
  initialState,
  action,
  mutationFn,
  onFormConfirm,
}: ExpenseFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });

      navigate("/expenses");
    },
  });

  const cancelHandler = () => navigate("/expenses");

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        {action === "CREATE" ? "Add new Expense" : "Update Expense"}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Please provide the details about the expense
      </Typography>
      <Box>
        <Form
          formInputs={formData}
          state={initialState}
          formActions={
            <FormActions<ExpenseData>
              submitBtnLabel="Create Expense"
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
