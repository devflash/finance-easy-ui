import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Form, IFormContext } from "../../components/common/form";
import { FormData, FormState } from "../../hooks/useForm";
import { Input } from "../../components/common/input";
import { FormActions } from "../common/formActions";
import Button from "@mui/material/Button";
import { isValidEmail } from "../../utils/util";

type IPersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

const initialState: FormState<IPersonalInfo> = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
  },
};

const formInputs: FormData<IPersonalInfo> = {
  firstName: {
    name: "firstName",
    render: (state, onChange) => (
      <Input
        value={state.data?.firstName}
        name="firstName"
        label="First Name"
        onChange={onChange}
        error={state.errors?.firstName?.isError}
        errorText={state.errors?.firstName?.errorMessage}
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
        value={state.data?.lastName}
        name="lastName"
        label="Last Name"
        onChange={onChange}
        error={state.errors?.lastName?.isError}
        errorText={state.errors?.lastName?.errorMessage}
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
        value={state.data?.email}
        name="email"
        label="Email"
        onChange={onChange}
        type="email"
        error={state.errors?.email?.isError}
        errorText={state.errors?.email?.errorMessage}
      />
    ),
    validation: [
      (state) => (state?.data?.email === "" ? "Email is mandatory" : ""),
      (state) =>
        !isValidEmail(state?.data?.email) ? "Please enter a valid Email" : "",
    ],
  },
};
export const PersonalInfo = () => {
  const handleSaveProfile = (
    formState: IFormContext<IPersonalInfo>["formState"],
    validation: IFormContext<IPersonalInfo>["validation"]
  ) => {
    validation(
      () => {
        if (formState.data) {
          alert(JSON.stringify(formState.data));
        }
      },
      (error) => {
        console.log(errors);
      }
    );
  };

  return (
    <Box bgcolor="#fff" padding="1rem" borderRadius="10px" marginBottom="1rem">
      <Typography component="h5" variant="h5">
        Profile
      </Typography>
      <Form
        formInputs={formInputs}
        state={initialState}
        formActions={
          <FormActions<IPersonalInfo>
            render={(formState, validation) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleSaveProfile(formState, validation)}
              >
                Update
              </Button>
            )}
          />
        }
      />
    </Box>
  );
};
