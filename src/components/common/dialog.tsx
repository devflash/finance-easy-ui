import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalState } from "../../hooks/useGlobalState";

type IDialogProps = {
  dialogTitle: string;
  children: JSX.Element;
  dialogBtnLabel: string;
  dialogBtnHandler: () => void;
} & Omit<DialogProps, "open">;

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const Dialog = ({
  dialogTitle,
  children,
  dialogBtnLabel,
  dialogBtnHandler,
  ...rest
}: IDialogProps) => {
  const { openDialog, setOpenDialog } = useGlobalState();
  return (
    <React.Fragment>
      <BootstrapDialog
        {...rest}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={dialogBtnHandler}>
            {dialogBtnLabel}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
