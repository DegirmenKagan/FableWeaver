import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type IProps = DialogContentProps & {
  title: string;
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  _onOKClick: () => void;
  btnOKText?: string;
  btnCancelText?: string;
};
const MessageDialog = (props: IProps) => {
  const {
    title,
    btnOKText,
    btnCancelText,
    _onOKClick,
    dialogVisible,
    setDialogVisible,
  } = props;

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleOkClick = async () => {
    _onOKClick();
    handleClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogVisible}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{btnCancelText ?? "No"}</Button>
          <Button autoFocus onClick={handleOkClick}>
            {btnOKText ?? "Yes"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default MessageDialog;
