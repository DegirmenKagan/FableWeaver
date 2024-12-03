import { apiClient } from "../utils/supabase";

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await apiClient.auth.signInWithPassword({
      email,
      password,
    });
    const user = data?.user;
    if (error) {
      throw error;
    }
    return user;
  } catch (error) {
    console.error("login", error);
    return null;
  }
};

export const logout = async () => {
  try {
    const { error } = await apiClient.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
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
