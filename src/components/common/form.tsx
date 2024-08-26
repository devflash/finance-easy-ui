import { createContext } from "react";
import { useForm, FormData, FormState } from "../../hooks/useForm";
import Box from "@mui/material/Box";
type IFormProps<T> = {
  formInputs: FormData<T>;
  state: FormState<T>;
  renderer?: (
    formState: FormState<T>,
    handleValueChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      v?: unknown
    ) => void
  ) => JSX.Element;
  formActions?: JSX.Element;
};

export type IFormContext<T> = {
  formState: FormState<T>;
  validation: (
    successFn: () => void,
    errorFn: (error: Partial<Record<keyof T, boolean>>) => void
  ) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormContext = createContext<IFormContext<unknown>>({
  formState: {
    data: null,
  },
  handleValueChange: () => {},
  validation: () => {},
});

export const Form = <T,>({
  formInputs,
  state,
  renderer,
  formActions,
}: IFormProps<T>) => {
  const form = useForm(formInputs, state);
  const { formState, handleValueChange } = form;
  return (
    <FormContext.Provider value={form}>
      <Box>
        {renderer
          ? renderer(formState, handleValueChange)
          : Object.values(formInputs).map((input) =>
              input.render(formState, handleValueChange)
            )}
      </Box>
      {formActions ? formActions : null}
    </FormContext.Provider>
  );
};
