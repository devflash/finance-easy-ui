import { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import { CustomSelect } from "../common/select";
import { CustomInput } from "../common/inputNew";
import { Dialog } from "../common/dialog";
import { useGlobalState } from "../../hooks/useGlobalState";
import { BudgetItem } from "./createBudget";
import { categories } from "../../utils/util";

type CategoryDialogProp = {
  editable: string;
  selectedCategories: BudgetItem[];
  addCategory: (allocation: BudgetItem) => void;
  updateCategory: (allocation: BudgetItem) => void;
};

const initialState = {
  category: {
    value: "",
    error: "",
  },
  budget: {
    value: "",
    error: "",
  },
  type: {
    value: "",
    error: "",
  },
};

type IState = typeof initialState;

const validNumber = /^\d+$/;

export const CategoryDialogForm = ({
  editable,
  selectedCategories,
  addCategory,
  updateCategory,
}: CategoryDialogProp) => {
  const { setOpenDialogKey } = useGlobalState();
  const [state, setState] = useState<IState>(initialState);

  useEffect(() => {
    if (editable) {
      const item = selectedCategories.find(
        (item) => item.category === editable
      );
      setState({
        category: {
          value: item?.category || "",
          error: "",
        },
        budget: {
          value: String(item?.budget) || "",
          error: "",
        },
        type: {
          value: item?.type || "",
          error: "",
        },
      });
    }
  }, [editable, selectedCategories]);

  const updateError = (name: keyof IState, error: string) => {
    setState({
      ...state,
      [name]: {
        ...state[name],
        error,
      },
    });
  };

  const isValid = () => {
    let result = true;
    if (!state.category.value) {
      updateError("category", "Category is required");
      result = false;
    }
    if (!state.type.value) {
      updateError("type", "Type is required");
      result = false;
    }
    if (!state.budget.value) {
      updateError("budget", "Amount is required");
      result = false;
      return;
    }
    if (!validNumber.test(state.budget.value)) {
      updateError("budget", "Amount is not valid");
      result = false;
    }
    return result;
  };

  const handleAllocation = () => {
    if (!isValid()) {
      return;
    }
    editable
      ? updateCategory({
          category: state.category.value,
          budget: Number(state.budget.value),
          type: state.type.value as "NEED" | "WANT" | "SAVING",
        })
      : addCategory({
          category: state.category.value,
          budget: Number(state.budget.value),
          type: state.type.value as "NEED" | "WANT" | "SAVING",
        });
    setOpenDialogKey("");
    setState(initialState);
  };

  const handleValueChange = (name: keyof IState, value: string) => {
    setState({
      ...state,
      [name]: {
        ...state[name],
        value,
        error: "",
      },
    });
  };

  console.log(categories);
  const filteredOptions = useMemo(() => {
    return categories.filter(
      (o) =>
        selectedCategories.findIndex(
          (s) => s.category === o.value && s.category !== editable
        ) === -1
    );
  }, [editable, selectedCategories]);

  console.log(filteredOptions);
  return (
    <Dialog
      dialogTitle="Category"
      dialogKey="CATEGORY_FORM"
      dialogBtnLabel="Allocate"
      maxWidth="lg"
      dialogBtnHandler={handleAllocation}
    >
      <Box>
        <CustomSelect
          value={state.category.value}
          name="category"
          disabled={filteredOptions.length === 0}
          label="Category"
          options={filteredOptions}
          onChange={(e) =>
            handleValueChange(e.target.name as keyof IState, e.target.value)
          }
          required
          error={!!state.category.error.length}
          errorText={state.category.error}
        />
        <CustomInput
          value={state.budget.value}
          name="budget"
          type="number"
          label="Amount"
          onChange={(e) =>
            handleValueChange(e.target.name as keyof IState, e.target.value)
          }
          required
          error={!!state.budget.error}
          errorText={state.budget.error}
        />
        <CustomSelect
          value={state.type.value}
          name="type"
          label="Type"
          options={[
            {
              label: "Need",
              value: "NEED",
            },
            {
              label: "Want",
              value: "WANT",
            },
            {
              label: "Saving",
              value: "SAVING",
            },
          ]}
          onChange={(e) =>
            handleValueChange(e.target.name as keyof IState, e.target.value)
          }
          required
          error={!!state.category.error.length}
          errorText={state.category.error}
        />
      </Box>
    </Dialog>
  );
};
