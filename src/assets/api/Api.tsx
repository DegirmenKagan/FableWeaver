import { apiClient } from "../utils/supabase";

export const getProfile = async () => {
  try {
    const { data, error } = await apiClient.from("user").select("*").single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("getProfile", error);
    return null;
  }
};
