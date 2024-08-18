import {useContext} from 'react'
import { GlobalState } from '../context/GlobalClientStateProvider';
export const useGlobalState = () => {
    const value = useContext(GlobalState);
    if (!value) {
      throw new Error(
        "useGlobalState should be used inside GlobalClienStateProvider"
      );
    }
    return value;
  };
  