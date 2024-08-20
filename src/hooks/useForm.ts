import { useReducer } from "react";

export type FormInput<T> = {
    name: keyof T,
    validation?: (value?: string ) => boolean
    render: (state: FormState<T>, onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void) => JSX.Element
}

export type FormData<T> = {
  [K in keyof T]: FormInput<T>
}

export type Errors<T> = Partial<Record<keyof T, boolean>>;

export type Data<T> = Record<keyof T, string>

export type FormState<T> = {
    data?: Data<T> | null,
    errors?: Errors<T> | null
}

type IAction<T> =
  | {
      type: "UPDATE_VALUES";
      payload: Data<T>
    }
  | {
      type: "UPDATE_ERROR";
      payload: Errors<T>;
    };

const createReducer = <T>() => (state: FormState<T>, action: IAction<T>): FormState<T> => {
  switch (action.type) {
    case "UPDATE_VALUES": {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
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
        for(const input of Object.values(formInputs) as FormInput<T>[]){
            const key = input.name;
            if(typeof input.validation === 'function'){
                const isError = input.validation(formState.data?.[key])
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
        dispatch({ type: "UPDATE_VALUES", payload: {[name]: value } as Data<T> });
        dispatch({ type: "UPDATE_ERROR", payload: { [name]: false } as Errors<T> });
      };

      return {formState, validation, handleValueChange}

}