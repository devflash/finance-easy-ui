import {useContext} from 'react'
import {FormContext, IFormContext} from '../components/common/form'
export const useFormContext = <T,>() => {
    const formContext = useContext(FormContext) as IFormContext<T>;
  
    if (!formContext) {
      throw new Error(
        "useFormContext should be used inside Form component context"
      );
    }
    return formContext;
  };
  