import { createContext } from "react";
import { useForm, FormData, FormState, FormInput } from "../../hooks/useForm";
import Box from "@mui/material/Box";
type IFormProps<T> = {
  formInputs: FormData<T>;
  state: FormState<T>;
  children?: JSX.Element;
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
  children,
  formActions,
}: IFormProps<T>) => {
  const form = useForm(formInputs, state);
  const { formState, handleValueChange } = form;
  return (
    <FormContext.Provider value={form}>
      <Box>
        {children
          ? children
          : Object.values(formInputs as FormInput<T>[]).map((input) =>
              input.render(formState, handleValueChange)
            )}
      </Box>
      {formActions ? formActions : null}
    </FormContext.Provider>
  );
};
