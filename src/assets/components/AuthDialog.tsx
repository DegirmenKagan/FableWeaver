import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect } from "react";
import { login, register } from "../api/AuthService";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { ProfileContext } from "../contexts/ProfileContext";

type AuthDialogProps = {
  open: boolean;
  isLogin?: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
};

export default function AuthDialog(props: AuthDialogProps) {
  const { open, setOpen } = props;
  const { setProfile } = useContext(ProfileContext);
  const [isLogin, setIsLogin] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (isLogin) {
      const { email, password } = formJson;
      console.log("Login data:", { email, password });
      const loggedInUser = await login(email.toString(), password.toString());
      if (loggedInUser) {
        setProfile(loggedInUser);
      }
      if (loggedInUser?.email) {
        alert(`Welcome back, ${loggedInUser.email}!`);
        handleClose();
      }
      // else {
      //   alert("Login failed.");
      // }
    } else {
      const { email, password, confirmPassword } = formJson;
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log("Register data:", { email, password, confirmPassword });

      const registeredUser = await register(
        email.toString(),
        password.toString()
      );
      if (registeredUser?.email) {
        alert(`Registration successful. Welcome, ${registeredUser.email}!`);
        setIsLogin(true);
        return;
      } else {
        alert("Registration failed.");
        return;
      }
    }
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
            placeholder="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <Input
            id="password"
            name="password"
            margin="dense"
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!isLogin ? (
            <Input
              id="confirmPassword"
              name="confirmPassword"
              margin="dense"
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle}>
            {isLogin ? "Need an account? Register" : "Have an account? Login"}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
