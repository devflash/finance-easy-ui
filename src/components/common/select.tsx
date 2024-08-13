import MenuItem from "@mui/material/MenuItem";
import { Input, InputProps } from "./input";

type SelectProps = InputProps & {
  options: [
    {
      label: string;
      value: string;
    }
  ];
};
export const Select = (props: SelectProps) => {
  const { options, ...rest } = props;
  return (
    <Input select {...rest}>
      {options.map((cur) => (
        <MenuItem key={cur.value} value={cur.label}>
          {cur.label}
        </MenuItem>
      ))}
    </Input>
  );
};
