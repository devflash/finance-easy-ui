import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CustomInput, CustomInputProps } from "./inputNew";

type CustomSelectProps = CustomInputProps & {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};
export const CustomSelect = (props: CustomSelectProps) => {
  const { id, label, options, ...rest } = props;
  return (
    <FormControl margin="dense" fullWidth>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id={id}
        input={<CustomInput label={label} {...rest} />}
      >
        {options.map((cur) => (
          <MenuItem key={cur.value} value={cur.value}>
            {cur.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
