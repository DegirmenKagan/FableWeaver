import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

type AuthDialogProps = {
  open: boolean;
  isLogin?: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
};

export default function AuthDialog(props: AuthDialogProps) {
  const { open, setOpen } = props;
  const [isLogin, setIsLogin] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (isLogin) {
      const { email, password } = formJson;
      console.log("Login data:", { email, password });
      // Implement login functionality here
    } else {
      const { email, password, confirmPassword } = formJson;
      console.log("Register data:", { email, password, confirmPassword });
      // Implement registration functionality here
    }

    handleClose();
  };

  useEffect(() => {
    if (props.isLogin !== undefined) {
      setIsLogin(props.isLogin);
    }
  }, [props.isLogin]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isLogin
              ? "Please enter your email and password to login."
              : "To create an account, please fill in your details below."}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          {!isLogin && (
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle}>
            {isLogin ? "Need an account? Register" : "Have an account? Login"}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
