import { useReducer } from "react";

type FormInput<T> = {
    name: keyof T,
    validation?: (value: string) => boolean
    render: (state: FormState<T>, onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void) => JSX.Element
}

export type FormData<T> = FormInput<T>[]

type Errors<T> = Partial<Record<keyof T, boolean>>;
type Data<T> = Record<keyof T, string>
export type FormState<T> = {
    data: Data<T>,
    errors: Errors<T>
}

type IAction<T> =
  | {
      type: "UPDATE_VALUES";
      payload: {
        key: keyof T;
        value: string;
      };
    }
  | {
      type: "UPDATE_ERROR";
      payload: Errors<T>;
    };

const createReducer = <T>() => (state: FormState<T>, action: IAction<T>): FormState<T> => {
  switch (action.type) {
    case "UPDATE_VALUES": {
      const { key, value } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [key]: value,
        },
      };
    }
    case "UPDATE_ERROR": {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const useForm = <T>(formInputs: FormData<T>, initialState: FormState<T>) => {
    const reducer = createReducer<T>()
    const [formState, dispatch] = useReducer(reducer, initialState);

    const validation = (
        successFn: () => void,
        errorFn: (error: Errors<T>) => void
      ) => {
        const errors: Errors<T> = {};
        for(const input of formInputs){
            const key = input.name as keyof T;
            if(typeof input.validation === 'function'){
                const isError = input.validation(formState.data[key])
                if(isError){
                    errors[key] = isError

                }
            }
        }
        if (!Object.keys(errors).length) {
          successFn();
        } else {
          dispatch({ type: "UPDATE_ERROR", payload: errors });
          errorFn(errors);
        }
      };

      const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof T
        const value = e.target.value
        dispatch({ type: "UPDATE_VALUES", payload: { key: name, value } });
        dispatch({ type: "UPDATE_ERROR", payload: { [name]: false } as Errors<T> });
      };

      return {formState, validation, handleValueChange}

}