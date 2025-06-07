import { Dialog } from "../common/dialog";
import { useForm, FormData, FormState } from "../../hooks/useForm";
import { Select } from "../common/select";
import Box from "@mui/material/Box";
import { Input } from "../common/input";
import { useSearchParams } from "react-router-dom";
import { useGlobalState } from "../../hooks/useGlobalState";

type ISavingFilter = {
  type: string;
  startDate: string;
  endDate: string;
};
const initialState: FormState<ISavingFilter> = {
  data: {
    type: "",
    endDate: "",
    startDate: "",
  },
};

const formInputs: FormData<ISavingFilter> = {
  type: {
    name: "type",
    render: (state, onChange) => (
      <Select
        name="type"
        value={state.data?.type}
        label="Investment type"
        options={[
          { label: "Mutual Fund", value: "mf" },
          { label: "Fixed Deposit", value: "fd" },
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

export const SavingFilter = () => {
  const { setOpenDialog } = useGlobalState();
  const { formState, handleValueChange } = useForm(formInputs, initialState);
  const [, setSearchParams] = useSearchParams();

  const filterHandler = () => {
    const query: Partial<ISavingFilter> = {};
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
      dialogTitle="Filter savings"
      dialogBtnLabel="Filter"
      dialogBtnHandler={filterHandler}
    >
      <Box>
        {formInputs.type.render(formState, handleValueChange)}
        <Box sx={{ display: "flex", gap: 5 }}>
          {formInputs.startDate.render(formState, handleValueChange)}
          {formInputs.endDate.render(formState, handleValueChange)}
        </Box>
      </Box>
    </Dialog>
  );
};
