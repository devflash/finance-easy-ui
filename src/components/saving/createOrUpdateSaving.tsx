import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "../common/input";
import { CustomSelect } from "../common/select";
import { FormActions } from "../common/formActions";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { createSavings, updateSaving } from "../../services/savingService";
import { useNavigate } from "react-router-dom";
import { FormData, FormState } from "../../hooks/useForm";
import { ISaving, SavingData } from "../../utils/types";
import { Form, IFormContext } from "../common/form";
import { useGetSavingById } from "../../hooks/saving/useGetSavingById";
import { useParams } from "react-router-dom";

type CreateSavingProps = { action: "CREATE" | "UPDATE" };

type SavingsFormProps = {
  initialState: FormState<SavingData>;
  action: CreateSavingProps["action"];
  mutationFn: (
    payload: { saving: SavingData } | { saving: SavingData; savingId: string }
  ) => Promise<ISaving>;
  onFormConfirm: (
    formState: IFormContext<SavingData>["formState"],
    validation: IFormContext<SavingData>["validation"],
    mutation: UseMutationResult<
      ISaving,
      Error,
      | {
          saving: SavingData;
        }
      | {
          saving: SavingData;
          savingId: string;
        },
      unknown
    >
  ) => void;
};

const formData: FormData<SavingData> = {
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
  investmentType: {
    name: "type",
    validation: [
      (state) =>
        state?.data?.investmentType === "" ? "Saving type is mandatory" : "",
    ],
    render: (state, onChange) => (
      <CustomSelect
        name="type"
        value={state.data?.investmentType}
        label="Investment type"
        subLabelText="Please select the Investment type"
        options={[
          { label: "Mutual Fund", value: "mf" },
          { label: "Fixed Deposit", value: "fd" },
        ]}
        required
        error={state?.errors?.investmentType?.isError}
        errorText={state?.errors?.investmentType?.errorMessage}
        onChange={onChange}
      />
    ),
  },
  description: {
    name: "description",
    render: (state, onChange) => (
      <Input
        name="description"
        value={state.data?.description}
        label="Description"
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
      (state) => (state?.data?.date === "" ? "Saving date is mandatory" : ""),
    ],
    render: (state, onChange) => (
      <Input
        name="date"
        value={state.data?.date}
        label="Saving Date"
        subLabelText="Please select the date when the saving is made"
        type="date"
        required
        error={state?.errors?.date?.isError}
        errorText={state?.errors?.date?.errorMessage}
        onChange={onChange}
      />
    ),
  },
};

export const CreateOrUpdateSaving = ({ action }: CreateSavingProps) => {
  return action === "CREATE" ? <CreateSaving /> : <UpdateSaving />;
};

const CreateSaving = () => {
  const initialState = {
    data: {
      investmentType: "",
      amount: "",
      date: "",
      description: "",
    },
    errors: {},
  };

  const createSavingHandler = (
    formState: IFormContext<SavingData>["formState"],
    validation: IFormContext<SavingData>["validation"],
    mutation: UseMutationResult<
      ISaving,
      Error,
      | {
          saving: SavingData;
        }
      | {
          saving: SavingData;
          savingId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data) mutation.mutate({ saving: formState.data });
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };
  return (
    <SavingForm
      initialState={initialState}
      action="CREATE"
      mutationFn={createSavings}
      onFormConfirm={createSavingHandler}
    />
  );
};

const UpdateSaving = () => {
  const { savingId } = useParams();
  const { data, isLoading } = useGetSavingById(savingId ? savingId : "");
  console.log(data);
  const initialState = {
    data: {
      investmentType: data?.investmentType || "",
      amount: String(data?.amount) || "",
      description: data?.description || "",
      date: data?.date ? new Date(data.date).toISOString().split("T")[0] : "",
    },
    errors: {},
  };

  const updateSavingHandler = (
    formState: IFormContext<SavingData>["formState"],
    validation: IFormContext<SavingData>["validation"],
    mutation: UseMutationResult<
      ISaving,
      Error,
      | {
          saving: SavingData;
        }
      | {
          saving: SavingData;
          savingId: string;
        },
      unknown
    >
  ) => {
    validation(
      () => {
        if (formState.data)
          mutation.mutate({ saving: formState.data, savingId });
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
    return <p>{`No income with id ${savingId} available`}</p>;
  }

  return (
    <SavingForm
      initialState={initialState}
      action="UPDATE"
      mutationFn={updateSaving}
      onFormConfirm={updateSavingHandler}
    />
  );
};

const SavingForm = ({
  initialState,
  action,
  mutationFn,
  onFormConfirm,
}: SavingsFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });

      navigate("/savings");
    },
  });

  const cancelHandler = () => navigate("/savings");

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        {action === "CREATE" ? "Add new Saving" : "Update Saving"}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Please provide the details about the saving
      </Typography>
      <Box>
        <Form
          formInputs={formData}
          state={initialState}
          formActions={
            <FormActions<SavingData>
              submitBtnLabel="Create Saving"
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
