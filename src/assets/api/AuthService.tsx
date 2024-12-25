import { apiClient } from "../utils/supabase";
import { getProfileByEmail, IUserDto } from "./UserService";

export const login = async (
  email: string,
  password: string
): Promise<IUserDto | null> => {
  try {
    const { data, error } = await apiClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      throw error;
    } else {
      const userResponse = await getProfileByEmail(email);
      if (userResponse) {
        return userResponse;
      } else {
        throw new Error("User not found");
      }
    }
  } catch (error) {
    console.error("login", error);
    return null;
  }
};

export const logout = async (
  setProfile: React.Dispatch<React.SetStateAction<IUserDto>>
) => {
  try {
    const { error } = await apiClient.auth.signOut();
    console.log(error);
    if (error) {
      throw error;
    } else {
      setProfile({
        id: 0,
        email: "",
        created_at: "",
        name: "",
        username: "",
        avatar: "",
      });
    }
  } catch (error) {
    alert("Error logging out");
    console.error("logout", error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const { data, error } = await apiClient.auth.signUp({
      email,
      password,
    });
    const user = data?.user;
    if (error) {
      throw error;
    }
    return user;
  } catch (error) {
    console.error("register", error);
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await apiClient.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("resetPassword", error);
  }
};

export const updatePassword = async (email: string, password: string) => {
  try {
    const { data, error } = await apiClient.auth.updateUser({
      email: email,
      password: password,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("updateUser", error);
    return null;
  }
};
