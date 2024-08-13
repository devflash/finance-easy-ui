import FormControl from "@mui/material/FormControl";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export type InputProps = TextFieldProps & {
  subLabelText: string;
  label: string;
};

const FormRow = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "15px 0 20px",
  alignItems: "center",
  maxWidth: "920px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    maxWidth: "100%",
  },
}));

const InputField = styled(TextField)(({ theme }) => ({
  border: "1px solid #A29E9E",
  borderRadius: "10px",
  minWidth: "3.5rem",
  maxWidth: "25rem",
  flex: 1,

  ".MuiInputBase-input": {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "100%",
    margin: "1rem 0",
  },
}));

const Label = styled(InputLabel)(({ theme }) => ({
  position: "static",
  transform: "unset",
  transformOrigin: "unset",
  overflow: "unset",
  maxWidth: "16rem",
  textWrap: "wrap",
  "& > p": {
    color: "#A29E9E",
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "100%",
  },
}));

export const Input = ({
  label,
  id,
  subLabelText,
  value,
  type,
  select,
  children,
  multiline,
  maxRows,
  rows,
}: InputProps) => {
  return (
    <FormRow fullWidth>
      <Label shrink htmlFor={id} sx={{ color: "#000000" }}>
        {label}
        {subLabelText && <Typography component="p">{subLabelText}</Typography>}
      </Label>

      <InputField
        id={id}
        value={value}
        type={type}
        select={select}
        variant="standard"
        multiline={multiline}
        maxRows={maxRows}
        rows={rows}
        InputProps={{
          disableUnderline: true,
          startAdornment:
            type === "number" ? (
              <InputAdornment position="end">
                <CurrencyRupeeIcon />
              </InputAdornment>
            ) : null,
        }}
      >
        {children}
      </InputField>
    </FormRow>
  );
};
