import { useState, createContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export type IStep = {
  key: string;
  stepLabel: string;
  render: () => JSX.Element;
};
type IStepWizardProps = {
  steps: IStep[];
};

type StepWizardContext = {
  steps: number;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};
export const StepWizardContext = createContext<StepWizardContext>({
  steps: 0,
  activeStep: 0,
  setActiveStep: () => {},
});

export const StepWizard = ({ steps }: IStepWizardProps) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.key} completed={index < activeStep}>
            <StepLabel>{step.stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepWizardContext.Provider
        value={{ steps: steps.length, activeStep, setActiveStep }}
      >
        {steps[activeStep].render()}
      </StepWizardContext.Provider>
    </Box>
  );
};
