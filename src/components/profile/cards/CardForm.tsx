import { Dialog } from "../../common/dialog";
import { FormData, FormState, useForm } from "../../../hooks/useForm";
import { ICardData } from "../../../utils/types";
import { Input } from "../../common/input";
import { Select } from "../../common/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCard } from "../../../services/userServices";
import { Box } from "@mui/material";
import { useGlobalState } from "../../../hooks/useGlobalState";
const initialState: FormState<ICardData> = {
  data: {
    cardNumber: "",
    expirationDate: "",
    name: "",
    type: "",
  },
};
const formInputs: FormData<ICardData> = {
  cardNumber: {
    name: "cardNumber",
    render: (state, onChange) => (
      <Input
        type="number"
        value={state.data?.cardNumber}
        name="cardNumber"
        label="Card number"
        onChange={onChange}
        error={state.errors?.cardNumber?.isError}
        errorText={state.errors?.cardNumber?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.cardNumber === "" ? "Card number is mandatory" : "",
    ],
  },
  expirationDate: {
    name: "expirationDate",
    render: (state, onChange) => (
      <Input
        type="date"
        value={state.data?.expirationDate}
        name="expirationDate"
        label="Expiry date"
        onChange={onChange}
        error={state.errors?.expirationDate?.isError}
        errorText={state.errors?.expirationDate?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.expirationDate === "" ? "FExpiry date is mandatory" : "",
    ],
  },
  type: {
    name: "type",
    render: (state, onChange) => (
      <Select
        value={state.data?.type}
        name="type"
        label="Card type"
        options={[
          { label: "Credit Card", value: "cc" },
          { label: "Debit Card", value: "dc" },
        ]}
        onChange={onChange}
        error={state.errors?.type?.isError}
        errorText={state.errors?.type?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.type === "" ? "FExpiry date is mandatory" : ""),
    ],
  },
  name: {
    name: "name",
    render: (state, onChange) => (
      <Input
        value={state.data?.name}
        name="name"
        label="Name on the card"
        onChange={onChange}
        error={state.errors?.name?.isError}
        errorText={state.errors?.name?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.name === "" ? "Name on the card is mandatory" : "",
    ],
  },
};

export const CardForm = () => {
  const { setOpenDialogKey } = useGlobalState();
  const { formState, handleValueChange, validation } = useForm(
    formInputs,
    initialState
  );
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
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
      dialogKey="CREDIT_CARD_DIALOG"
      dialogTitle="Add Credit/Debit Card"
      dialogBtnLabel="Add"
      dialogBtnHandler={onAddClick}
    >
      <Box>
        {formInputs.cardNumber.render(formState, handleValueChange)}
        {formInputs.expirationDate.render(formState, handleValueChange)}
        {formInputs.type.render(formState, handleValueChange)}
        {formInputs.name.render(formState, handleValueChange)}
      </Box>
    </Dialog>
  );
};
