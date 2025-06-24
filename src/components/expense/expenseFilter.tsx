import { Dialog } from "../common/dialog";
import { useForm, FormData, FormState } from "../../hooks/useForm";
import Box from "@mui/material/Box";
import { Input } from "../common/input";
import { CustomSelect } from "../common/select";
import { useSearchParams } from "react-router-dom";
import { useGlobalState } from "../../hooks/useGlobalState";

type IExpenseFilter = {
  recipient: string;
  category: string;
  startDate: string;
  endDate: string;
};
const initialState: FormState<IExpenseFilter> = {
  data: {
    recipient: "",
    category: "",
    endDate: "",
    startDate: "",
  },
};

const formInputs: FormData<IExpenseFilter> = {
  recipient: {
    name: "recipient",
    render: (state, onChange) => (
      <Input
        value={state.data?.recipient}
        name="recipient"
        label="Recipient name"
        onChange={onChange}
      />
    ),
  },
  category: {
    name: "category",
    render: (state, onChange) => (
      <CustomSelect
        name="category"
        value={state.data?.category}
        label="Category"
        options={[
          { label: "Grocery", value: "grocery" },
          { label: "Light Bill", value: "lightBill" },
        ]}
        onChange={onChange}
      />
    ),
  },
  startDate: {
    name: "startDate",
    render: (state, onChange) => (
      <Input
        name="startDate"
        value={state.data?.startDate}
        label="Start Date"
        type="date"
        onChange={onChange}
      />
    ),
  },
  endDate: {
    name: "endDate",
    render: (state, onChange) => (
      <Input
        name="endDate"
        value={state.data?.endDate}
        label="End Date"
        type="date"
        onChange={onChange}
      />
    ),
  },
};

export const ExpenseFilter = () => {
  const { setOpenDialog } = useGlobalState();
  const { formState, handleValueChange } = useForm(formInputs, initialState);
  const [, setSearchParams] = useSearchParams();

  const filterHandler = () => {
    const query: Partial<IExpenseFilter> = {};
    if (formState.data) {
      for (const entry of Object.entries(formState.data)) {
        const key = entry[0] as keyof typeof formState.data;
        const value = entry[1];
        if (formState.data[key]) {
          query[key] = value;
        }
      }
    }
    setSearchParams(query);
    setOpenDialog(false);
  };

  return (
    <Dialog
      dialogTitle="Filter expenses"
      dialogBtnLabel="Filter"
      dialogBtnHandler={filterHandler}
    >
      <Box>
        {formInputs.recipient.render(formState, handleValueChange)}
        {formInputs.category.render(formState, handleValueChange)}
        <Box sx={{ display: "flex", gap: 5 }}>
          {formInputs.startDate.render(formState, handleValueChange)}
          {formInputs.endDate.render(formState, handleValueChange)}
        </Box>
      </Box>
    </Dialog>
  );
};
