import Box from "@mui/material/Box";
import { Form, IFormContext } from "../common/form";
import { FormData, FormState } from "../../hooks/useForm";
import { StepWizardActions } from "../common/stepWizard/stepWizardActions";
import { Input } from "../common/input";
import { FormActions } from "../common/formActions";

type IBudgetDetailsProps = {
  dispatch: React.Dispatch<unknown>;
};
type IBudgetDetail = {
  budgetName: string;
  startDate: string;
  endDate: string;
};

const formState: FormState<IBudgetDetail> = {
  data: {
    budgetName: "",
    endDate: "",
    startDate: "",
  },
};

const formInputs: FormData<IBudgetDetail> = {
  budgetName: {
    name: "budgetName",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        value={state.data?.budgetName}
        name="budgetName"
        label="Budget name"
        subLabelText="Please enter a name for the budget"
        onChange={onChange}
        required
        error={state?.errors?.budgetName}
        errorText="Budget name is mandatory"
      />
    ),
  },
  startDate: {
    name: "startDate",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        name="startDate"
        value={state.data?.startDate}
        label="Start Date"
        subLabelText="Enter the starting date of the budget"
        type="date"
        onChange={onChange}
        required
        error={state.errors?.startDate}
        errorText="Start date is mandatory"
      />
    ),
  },
  endDate: {
    name: "endDate",
    validation: (value) => value === "",
    render: (state, onChange) => (
      <Input
        name="endDate"
        value={state.data?.endDate}
        label="End Date"
        subLabelText="Enter the ending date of the budget"
        type="date"
        required
        error={state.errors?.endDate}
        errorText="End date is mandatory"
        onChange={onChange}
      />
    ),
  },
};
export const BudgetDetailsStep = ({ dispatch }: IBudgetDetailsProps) => {
  const handleNext = (
    formState: IFormContext<IBudgetDetail>["formState"],
    validation: IFormContext<IBudgetDetail>["validation"],
    onNext: () => void
  ) => {
    validation(
      () => {
        dispatch({ budgetDetails: formState.data });
        onNext();
      },
      (errors) => {
        console.log(errors);
      }
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "750px", margin: "0 auto" }}>
      <Form
        formInputs={formInputs}
        state={formState}
        formActions={
          <FormActions<IBudgetDetail>
            render={(formState, validation) => (
              <StepWizardActions
                onNextClick={({ onNext }) =>
                  handleNext(formState, validation, onNext)
                }
                onPrevClick={({ onPrev }) => onPrev()}
              />
            )}
          />
        }
      />
    </Box>
  );
};
