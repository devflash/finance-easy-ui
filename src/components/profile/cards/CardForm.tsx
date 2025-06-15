import { Dialog } from "../../common/dialog";
import { Form, IFormContext } from "../../common/form";
import { FormData, FormState } from "../../../hooks/useForm";
import { ICard } from "../../../utils/types";
import { Input } from "../../common/input";
import { Select } from "../../common/select";
import { FormActions } from "../../common/formActions";
import { Button } from "@mui/material";

const initialState: FormState<ICard> = {
  data: {
    cardNumber: "",
    expirationDate: "",
    name: "",
    type: "",
  },
};
const formInputs: FormData<ICard> = {
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
          { label: "Credit Card", value: "cd" },
          { label: "Debit Card", value: "db" },
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
  const onAddClick = (
    state: IFormContext<ICard>["formState"],
    validation: IFormContext<ICard>["validation"]
  ) => {
    validation(
      () => {
        if (state.data) {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <Dialog
      dialogTitle="Add Credit/Debit Card"
      dilogBtnRenderer={
        <FormActions
          render={(state, validation) => (
            <Button onClick={() => onAddClick(state, validation)}>Add</Button>
          )}
        />
      }
    >
      <Form formInputs={formInputs} state={initialState} />
    </Dialog>
  );
};
