import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ButtonProp = {
  isPrimary?: boolean;
};

type FormActionButtonProps = {
  submitBtnLabel: string;
  cancelBtnLabel?: string;
  submitBtnClick: () => void;
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

export const FormActions = (props: FormActionButtonProps) => {
  const {
    submitBtnLabel,
    submitBtnClick,
    cancelBtnClick,
    cancelBtnLabel = "Cancel",
  } = props;
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
      <CustomButton isPrimary onClick={submitBtnClick}>
        {submitBtnLabel}
      </CustomButton>
    </Box>
  );
};
