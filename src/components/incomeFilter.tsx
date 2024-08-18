import { Dialog } from "./common/dialog";
import { useForm, FormData, FormState } from "../hooks/useForm";
import Box from "@mui/material/Box";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { useSearchParams } from "react-router-dom";
import { useGlobalState } from "../hooks/useGlobalState";
type IIncomeFilter = {
  source: string;
  category: string;
  startDate: string;
  endDate: string;
};
const initialState: FormState<IIncomeFilter> = {
  data: {
    source: "",
    category: "",
    endDate: "",
    startDate: "",
  },
};

const formInputs: FormData<IIncomeFilter> = [
  {
    name: "source",
    render: (state, onChange) => (
      <Input
        value={state.data.source}
        name="source"
        label="Income source"
        onChange={onChange}
      />
    ),
  },
  {
    name: "category",
    render: (state, onChange) => (
      <Select
        name="category"
        value={state.data.category}
        label="Category"
        options={[{ label: "Salary", value: "salary" }]}
        onChange={onChange}
      />
    ),
  },
  {
    name: "startDate",
    render: (state, onChange) => (
      <Input
        name="startDate"
        value={state.data.startDate}
        label="Start Date"
        type="date"
        onChange={onChange}
      />
    ),
  },
  {
    name: "endDate",
    render: (state, onChange) => (
      <Input
        name="endDate"
        value={state.data.endDate}
        label="End Date"
        type="date"
        onChange={onChange}
      />
    ),
  },
];

export const IncomeFilter = () => {
  const { setOpenDialog } = useGlobalState();
  const { formState, handleValueChange } = useForm(formInputs, initialState);
  const [, setSearchParams] = useSearchParams();

  const filterHandler = () => {
    const query: Partial<IIncomeFilter> = {};
    for (const entry of Object.entries(formState.data)) {
      const key = entry[0] as keyof typeof formState.data;
      const value = entry[1];
      if (formState.data[key]) {
        query[key] = value;
      }
    }
    setSearchParams(query);
    setOpenDialog(false);
  };

  return (
    <Dialog
      dialogTitle="Filter incomes"
      dialogBtnLabel="Filter"
      dialogBtnHandler={filterHandler}
    >
      <Box>
        {formInputs.map((input) => input.render(formState, handleValueChange))}
      </Box>
    </Dialog>
  );
};
