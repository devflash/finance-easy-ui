import { alpha, styled } from "@mui/material/styles";
import Input, { InputProps } from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export type CustomInputProps = InputProps & {
  label: string;
  errorText?: string;
};
const BootstrapInput = styled(Input)(({ theme, error }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#FFF",
    border: "1px solid",
    borderColor: error ? theme.palette.error.main : "#E0E3E7",
    fontSize: 16,
    width: "100%",
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: error
        ? theme.palette.error.dark
        : theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

export const CustomInput = (props: CustomInputProps) => {
  const { label, required, error, errorText, id, ...rest } = props;
  return (
    <FormControl margin="dense" error={error} variant="standard" fullWidth>
      <InputLabel
        shrink
        htmlFor={id}
        sx={(theme) => ({
          fontSize: "1.3rem",
          color: theme.palette.primary.main,
        })}
        required={required}
      >
        {label}
      </InputLabel>
      <BootstrapInput
        required={required}
        error={error}
        disableUnderline
        {...rest}
      />
      {errorText ? (
        <FormHelperText
          sx={{
            fontSize: "0.8rem",
            pl: "0.5rem",
            color: (theme) => theme.palette.error.main,
          }}
        >
          {errorText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
