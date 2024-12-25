import { updatePassword } from "../../api/AuthService";
import { getProfileById, IUserDto } from "../../api/UserService";

export const doGetProfile = async (
  setProfile: React.Dispatch<React.SetStateAction<IUserDto>>
) => {
  const userId = 1;
  const user = await getProfileById(userId);
  if (user) {
    setProfile(user);
  }
};

export const doUpdatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  if (oldPassword === "") {
    return { error: "Please enter your old password." };
  }
  if (newPassword === "") {
    return { error: "Please enter a new password." };
  }
  if (confirmPassword === "") {
    return { error: "Please confirm your new password." };
  }
  if (oldPassword === newPassword) {
    return { error: "New password must be different from old password." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  updatePassword(email, newPassword);
};

export const handleGetProfile = (
  setProfile: React.Dispatch<React.SetStateAction<IUserDto>>
) => {
  doGetProfile(setProfile);
};
