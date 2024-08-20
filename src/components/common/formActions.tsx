import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useFormContext } from "../../hooks/useFormContext";
import { FormState } from "../../hooks/useForm";
import { IFormContext } from "./form";
type ButtonProp = {
  isPrimary?: boolean;
};

type FormActionButtonProps<T> = {
  submitBtnLabel: string;
  cancelBtnLabel?: string;
  submitBtnClick: (
    formState: FormState<T>,
    validation: IFormContext<T>["validation"]
  ) => void;
  cancelBtnClick: () => void;
};

const CustomButton = styled(Button)<ButtonProp>(({ theme, isPrimary }) => ({
  flex: "1",
  border: "1px solid black",
  maxWidth: "200px",
  ...(isPrimary && {
    backgroundColor: theme.palette.primary.main,
    color: isPrimary && theme.palette.primary.contrastText,
  }),
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    width: "100%",
    marginBottom: "1rem",
  },
}));

export const FormActions = <T,>(props: FormActionButtonProps<T>) => {
  const {
    submitBtnLabel,
    submitBtnClick,
    cancelBtnClick,
    cancelBtnLabel = "Cancel",
  } = props;
  const { formState, validation } = useFormContext<T>();
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "450px",
        margin: "0 auto",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      })}
    >
      <CustomButton onClick={cancelBtnClick}>{cancelBtnLabel}</CustomButton>
      <CustomButton
        isPrimary
        onClick={() => submitBtnClick(formState, validation)}
      >
        {submitBtnLabel}
      </CustomButton>
    </Box>
  );
};
