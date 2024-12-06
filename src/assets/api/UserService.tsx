import { apiClient } from "../utils/supabase";

export type IUserDto = {
  id: number;
  created_at: string;
  name: string;
  username: string;
  // password: string;
  email: string;
  avatar: string;
};

export const getProfile = async (userId: number) => {
  try {
    const { data, error } = await apiClient
      .from("User")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      throw error;
    }
    const user = data as IUserDto;
    return user;
  } catch (error) {
    console.error("getProfile", error);
    return undefined;
  }
};
