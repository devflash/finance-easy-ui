import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Input } from "../components/common/input";
import { FormData, FormState } from "../hooks/useForm";
import { Form, IFormContext } from "./common/form";
import { isValidEmail, isStrongPassword } from "../utils/util";
import { FormActions } from "./common/formActions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../services/authenticationService";
type ISignupState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const initialState: FormState<ISignupState> = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
};

const formInputs: FormData<ISignupState> = {
  firstName: {
    name: "firstName",
    render: (state, onChange) => (
      <Input
        value={state.data?.firstName}
        name="firstName"
        label="First name"
        onChange={onChange}
        error={state?.errors?.firstName?.isError}
        errorText={state?.errors?.firstName?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.firstName === "" ? "First name is mandatory" : "",
    ],
  },
  lastName: {
    name: "lastName",
    render: (state, onChange) => (
      <Input
        name="lastName"
        value={state.data?.lastName}
        label="Last name"
        onChange={onChange}
        error={state?.errors?.lastName?.isError}
        errorText={state?.errors?.lastName?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.lastName === "" ? "Last name is mandatory" : ""),
    ],
  },
  email: {
    name: "email",
    render: (state, onChange) => (
      <Input
        name="email"
        value={state.data?.email}
        label="Email address"
        onChange={onChange}
        error={state?.errors?.email?.isError}
        errorText={state?.errors?.email?.errorMessage}
      />
    ),
    validation: [
      (state) =>
        state?.data?.email === "" ? "Email address is mandatory" : "",
      (state) =>
        !isValidEmail(state?.data?.email)
          ? "Please enter a valid email address"
          : "",
    ],
  },
  password: {
    name: "password",
    render: (state, onChange) => (
      <Input
        name="password"
        value={state.data?.password}
        label="Password"
        onChange={onChange}
        error={state?.errors?.password?.isError}
        errorText={state?.errors?.password?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.password === "" ? "Password is mandatory" : ""),
      (state) =>
        !isStrongPassword(state?.data?.password)
          ? "Please enter a strong password"
          : "",
    ],
  },
};

export const Signup = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      navigate("/incomes");
    },
  });

  const handleCreateAccount = (
    formState: IFormContext<ISignupState>["formState"],
    validation: IFormContext<ISignupState>["validation"]
  ) => {
    validation(
      () => {
        if (formState?.data) {
          mutation.mutate(formState.data);
        }
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "1rem",
      }}
    >
      <Typography component="h1" sx={{ fontSize: "2.8rem", color: "#112D4E" }}>
        Finance Easy
      </Typography>

      <Paper
        sx={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem 1rem",
          margin: "50px auto 0",
          justifySelf: "center",
        }}
      >
        <Typography component="p" textAlign="center" fontSize="1.5rem">
          Enter your details to create an account
        </Typography>
        <Typography component="p" textAlign="center">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", display: "inline" }}>
            Login
          </Link>
        </Typography>
        <Box>
          <Form
            formInputs={formInputs}
            state={initialState}
            renderer={(formState, handleValueChange) => (
              <>
                <Box sx={{ display: "flex", gap: 5 }}>
                  {formInputs.firstName.render(formState, handleValueChange)}
                  {formInputs.lastName.render(formState, handleValueChange)}
                </Box>
                {formInputs.email.render(formState, handleValueChange)}

                {formInputs.password.render(formState, handleValueChange)}
              </>
            )}
            formActions={
              <FormActions<ISignupState>
                render={(formState, validation) => (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: "20px" }}
                    onClick={() => handleCreateAccount(formState, validation)}
                  >
                    Signup
                  </Button>
                )}
              />
            }
          ></Form>
        </Box>
      </Paper>
    </Box>
  );
};
