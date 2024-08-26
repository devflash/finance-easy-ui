import FormControl from "@mui/material/FormControl";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export type InputProps = TextFieldProps & {
  subLabelText?: string;
  label?: string;
  errorText?: string;
};

const FormRow = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "15px 0 20px",
  alignItems: "center",
  maxWidth: "920px",
  flexWrap: "wrap",
  gap: 20,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    maxWidth: "100%",
  },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  flex: "1 1 450px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "100%",
    margin: "1rem 0",
    flex: "1 1 auto",
  },
}));

const InputField = styled(TextField)(({ theme, error }) => ({
  border: error ? `1px solid ${theme.palette.error.main}` : "1px solid #A29E9E",
  borderRadius: "10px",
  width: "100%",
  ".MuiInputBase-input": {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const Label = styled(InputLabel)(({ theme }) => ({
  position: "static",
  transform: "unset",
  transformOrigin: "unset",
  overflow: "unset",
  textWrap: "wrap",
  width: "250px",
  "& > p": {},
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "100%",
  },
}));

export const Input = ({
  id,
  type,
  label,
  value,
  subLabelText,
  children,
  onChange,
  required,
  error,
  errorText,
  ...rest
}: InputProps) => {
  return (
    <FormRow fullWidth>
      {label ? (
        <Label shrink htmlFor={id} sx={{ color: "#000000" }}>
          <Typography component="p" sx={{ display: "flex" }}>
            {label}
            {required && <Typography>*</Typography>}
          </Typography>
          {subLabelText && (
            <Typography
              component="p"
              sx={{ color: "#A29E9E", fontSize: "0.7rem" }}
            >
              {subLabelText}
            </Typography>
          )}
        </Label>
      ) : null}

      <InputWrapper>
        <InputField
          id={id}
          value={value}
          type={type}
          variant="standard"
          error={error}
          // helperText="Field is required"
          InputProps={{
            disableUnderline: true,
            startAdornment:
              type === "number" ? (
                <InputAdornment position="end">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ) : null,
          }}
          onChange={onChange}
          {...rest}
        >
          {children}
        </InputField>
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
      </InputWrapper>
    </FormRow>
  );
};
