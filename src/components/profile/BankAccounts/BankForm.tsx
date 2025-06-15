import { Dialog } from "../../common/dialog";
import { FormData, FormState, useForm } from "../../../hooks/useForm";
import { IBankAccountsData } from "../../../utils/types";
import { Input } from "../../common/input";
import { Select } from "../../common/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBank } from "../../../services/userServices";
import { Box } from "@mui/material";
import { useGlobalState } from "../../../hooks/useGlobalState";

const initialState: FormState<IBankAccountsData> = {
  data: {
    accountNumber: "",
    bankName: "",
    branch: "",
    type: "",
  },
};

const formInputs: FormData<IBankAccountsData> = {
  accountNumber: {
    name: "accountNumber",
    render: (state, onChange) => (
      <Input
        type="number"
        value={state.data?.accountNumber}
        name="accountNumber"
        label="Card number"
        onChange={onChange}
        error={state.errors?.accountNumber?.isError}
        errorText={state.errors?.accountNumber?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.accountNumber === "" ? "Card number is mandatory" : "",
    ],
  },
  bankName: {
    name: "bankName",
    render: (state, onChange) => (
      <Select
        value={state.data?.bankName}
        name="bankName"
        label="Bank Name"
        options={[
          { label: "IDBI Bank", value: "idbi" },
          { label: "HDFC Bank", value: "hdfc" },
          { label: "Bank Of India", value: "boi" },
          { label: "ICICI Bank", value: "icici" },
        ]}
        onChange={onChange}
        error={state.errors?.bankName?.isError}
        errorText={state.errors?.bankName?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.bankName === "" ? "Bank name is Mandatory" : ""),
    ],
  },
  branch: {
    name: "branch",
    render: (state, onChange) => (
      <Input
        value={state.data?.branch}
        name="branch"
        label="Branch name"
        onChange={onChange}
        error={state.errors?.branch?.isError}
        errorText={state.errors?.branch?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.branch === "" ? "Branch name is mandatory" : ""),
    ],
  },
  type: {
    name: "type",
    render: (state, onChange) => (
      <Select
        value={state.data?.type}
        name="type"
        label="Bank Name"
        options={[
          { label: "Saving", value: "saving" },
          { label: "Current", value: "current" },
        ]}
        onChange={onChange}
        error={state.errors?.type?.isError}
        errorText={state.errors?.type?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.branch === "" ? "Account type is mandatory" : "",
    ],
  },
};

export const BankForm = () => {
  const { setOpenDialogKey } = useGlobalState();
  const { formState, handleValueChange, validation } = useForm(
    formInputs,
    initialState
  );
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: addBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      setOpenDialogKey("");
    },
  });
  const onAddClick = () => {
    validation(
      () => {
        if (formState.data) {
          mutatation.mutate(formState.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <Dialog
      dialogKey="BANK_ACCOUNT_DIALOG"
      dialogTitle="Add bank account"
      dialogBtnLabel="Add"
      dialogBtnHandler={onAddClick}
    >
      <Box>
        {formInputs.bankName.render(formState, handleValueChange)}
        {formInputs.accountNumber.render(formState, handleValueChange)}
        {formInputs.type.render(formState, handleValueChange)}
        {formInputs.branch.render(formState, handleValueChange)}
      </Box>
    </Dialog>
  );
};
