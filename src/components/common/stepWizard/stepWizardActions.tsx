import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useStepContext } from "../../../hooks/useStepContext";
type IStepWizardProps = {
  onNextClick: (props: {
    activeStep: number;
    onNext: () => void;
    onPrev: () => void;
  }) => void;
  onPrevClick: (props: {
    activeStep: number;
    onNext: () => void;
    onPrev: () => void;
  }) => void;
};

export const StepWizardActions = ({
  onNextClick,
  onPrevClick,
}: IStepWizardProps) => {
  const { steps, activeStep, setActiveStep } = useStepContext();
  const onNext = () => {
    if (activeStep < steps - 1) {
      setActiveStep((step) => step + 1);
    }
  };

  const onPrev = () => {
    if (activeStep > 0) {
      setActiveStep((step) => step - 1);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        color="secondary"
        onClick={() => onPrevClick({ activeStep, onNext, onPrev })}
        disabled={activeStep === 0}
      >
        Previous
      </Button>
      {activeStep === steps - 1 ? (
        <Button
          color="primary"
          onClick={() => onNextClick({ activeStep, onNext, onPrev })}
        >
          Create
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={() => onNextClick({ activeStep, onNext, onPrev })}
        >
          Next
        </Button>
      )}
    </Box>
  );
};
