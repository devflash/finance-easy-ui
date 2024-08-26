import { useReducer } from "react";
import _ from "lodash";

export type FormInput<T> = {
    name: string,
    validation?: (value?: string ) => boolean
    render: (state: FormState<T>, onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void) => JSX.Element
}

export type FormData<T> = Record<string, FormInput<T>>


export type Errors<T> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : boolean
};

export type Data<T> = {
  [K in keyof T]: T[K]
}

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
        data: _.merge({...state.data}, {...action.payload})
      };
    }
    case "UPDATE_ERROR": {
      return {
        ...state,
        errors: _.merge({...state.errors}, {...action.payload})
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
                const isError = input.validation(_.get(formState.data, key as string))
                if(isError){
                    _.set(errors, key, isError)
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

      const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, v?: unknown ) => {
        const {type, value, checked} = e.target
        const name = e.target.name as keyof T
        const val = type === 'checkbox' ? checked : value
        // dispatch({ type: "UPDATE_VALUES", payload: {[name]: value } as Data<T> });
        dispatch({ type: "UPDATE_VALUES", payload: _.set({}, name, val) as Data<T> });
        dispatch({ type: "UPDATE_ERROR", payload: _.set({}, name, false) as Errors<T> });
      };

      return {formState, validation, handleValueChange}

}