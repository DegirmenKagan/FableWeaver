import { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ProfileError } from "../../types/types";
import { ProfileContext } from "../../contexts/ProfileContext";
import { doGetProfile, doUpdatePassword } from "./SettingPage.functions";
import { updateProfile } from "../../api/UserService";
// import { getProfile } from "../../api/UserService";

const SettingPage = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [userData, setUserData] = useState(profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMode, setPasswordMode] = useState<boolean>(false);

  const [errors, setErrors] = useState<ProfileError>({});

  const handleGetProfile = () => {
    doGetProfile(setProfile);
  };

  // Handle input change for email, name, and password
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle password visibility toggle
  const handleClickShowPassword = (name: string) => {
    switch (name) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Handle password input change
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Validate the form before saving changes
  const validateForm = () => {
    const newErrors: ProfileError = {};
    if (passwordMode) {
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(userData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }

      // Validate old password
      if (!oldPassword) {
        newErrors.oldPassword = "Please enter your old password.";
      }

      // Validate password and confirm password match
      if (newPassword && newPassword.length < 8) {
        newErrors.password = "Password should be at least 8 characters.";
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    } else {
      //validate username
      if (!userData.username) {
        newErrors.username = "Please enter a username.";
      }
      // Validate name
      if (!userData.name) {
        newErrors.name = "Please enter your name.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for updating user information
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(typeof e);
    e.preventDefault();
    if (validateForm()) {
      console.log("userData", userData);
      if (passwordMode) {
        if (!oldPassword || !newPassword || !confirmPassword) {
          const response = await doUpdatePassword(
            userData.email,
            oldPassword,
            newPassword,
            confirmPassword
          );
          if (response) {
            alert(response.error);
            return;
          }
        }
      } else {
        if (
          userData.username !== profile.username ||
          userData.name !== profile.name ||
          userData.avatar !== profile.avatar
        ) {
          const response = await updateProfile(userData);
          if (response) {
            setProfile(userData);
          }
        }
      }

      console.log("User Data Updated:", { ...userData, password: newPassword });
      alert("Profile updated successfully!");
    }
  };

  useEffect(() => {
    if (profile.id === 0) {
      handleGetProfile();
    }
  }, []);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      setUserData(profile);
    }
  }, [profile]);
  //TODO: by settings page, save username name to auth table. and also update the user table
  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>
              {userData.name.charAt(0)}
            </Avatar>
          </Box>

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              onClick={() => setPasswordMode(!passwordMode)}
              variant="contained"
              color="primary"
            >
              {passwordMode ? "Name / Username" : "Email / Password"}
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            {passwordMode ? (
              <>
                {/* Email */}
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                />

                {/* Password (Old Password) */}
                <TextField
                  fullWidth
                  label="Old Password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  variant="outlined"
                  type={showOldPassword ? "text" : "password"}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleClickShowPassword("oldPassword")}
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />

                {/* Password (New Password) */}
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  variant="outlined"
                  type={showNewPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleClickShowPassword("newPassword")}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </>
            ) : (
              <>
                {" "}
                {/* Username */}
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  error={!!errors.username}
                  helperText={errors.username}
                />
                {/* Name */}
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </>
            )}

            {/* Submit Button */}
            <Box mt={3} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingPage;
