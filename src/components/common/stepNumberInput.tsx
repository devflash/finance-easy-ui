import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
  errorText?: string;
} & InputBaseProps;

const SteperInput = styled(InputBase)(({ theme, error }) => ({
  width: "4rem",
  "& .MuiInputBase-input": {
    border: error
      ? `1px solid ${theme.palette.error.main}`
      : "1px solid #A29E9E",
    borderRadius: "10px",
    textAlign: "center",
  },
}));

export const StepperNumberInput = ({
  onStepperInputChange,
  min = 0,
  max = 100,
  error,
  errorText,
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
    <Box sx={{ width: "100%", maxWidth: "150px" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
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
      {error ? (
        <Typography
          sx={{
            fontSize: "0.8rem",
            pl: "0.5rem",
            color: (theme) => theme.palette.error.main,
          }}
        >
          {errorText}
        </Typography>
      ) : null}
    </Box>
  );
};
