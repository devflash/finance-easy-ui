import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

type StepperProps = {
  min: number;
  max: number;
  onStepperInputChange: (
    value: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
} & InputBaseProps;

const SteperInput = styled(InputBase)({
  width: "4rem",
  "& .MuiInputBase-input": {
    border: "1px solid black",
    borderRadius: "10px",
    textAlign: "center",
  },
});

export const StepperNumberInput = ({
  onStepperInputChange,
  min = 0,
  max = 100,
  ...rest
}: StepperProps) => {
  const [value, setValue] = useState<number>(0);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/\D/g.test(e.target.value)) {
      let v = Number(e.target.value);
      if (v > max) {
        v = max;
      } else if (value < min) {
        v = min;
      }
      setValue(v);
      onStepperInputChange(v, e);
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", maxWidth: "150px", gap: 1 }}>
      <IconButton
        onClick={() => {
          value < max && setValue((prev) => prev + 1);
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
      <SteperInput
        {...rest}
        value={value}
        type="text"
        onChange={handleValueChange}
      />
      <IconButton onClick={() => value > min && setValue((prev) => prev - 1)}>
        <RemoveIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
