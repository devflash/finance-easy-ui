import {useContext} from 'react'
import {StepWizardContext} from '../components/common/stepWizard/stepWizard'
export const useStepContext = () => {
    const stepContext = useContext(StepWizardContext)
  
    if (!stepContext) {
      throw new Error(
        "useFormContext should be used inside Form component context"
      );
    }
    return stepContext;
  };
  