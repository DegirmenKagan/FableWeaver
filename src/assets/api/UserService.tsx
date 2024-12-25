import { apiClient } from "../utils/supabase";

export type IUserDto = {
  id: number;
  created_at: string;
  name: string;
  username: string;
  // password: string;
  email: string;
  avatar: string;
  bio?: string;
};

export const getProfileById = async (userId: number) => {
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
    console.error("getProfileById", error);
    return undefined;
  }
};

export const getProfileByEmail = async (email: string) => {
  try {
    const { data, error } = await apiClient
      .from("User")
      .select("*")
      .eq("email", email)
      .single();
    if (error) {
      throw error;
    }
    const user = data as IUserDto;
    return user;
  } catch (error) {
    console.error("getProfileByEmail", error);
    return undefined;
  }
};

export const updateProfile = async (user: IUserDto) => {
  try {
    const { data, error } = await apiClient
      .from("User")
      .update({ username: user.username, name: user.name, avatar: user.avatar })
      .eq("id", user.id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as IUserDto;
  } catch (error) {
    console.error("updateProfile", error);
    return undefined;
  }
};

export const patchAvatar = async (userId: number, avatar: string) => {
  try {
    const { data, error } = await apiClient
      .from("User")
      .update({ avatar })
      .eq("id", userId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as IUserDto;
  } catch (error) {
    console.error("patchAvatar", error);
    return undefined;
  }
};

export const patchBioByUserId = async (userId: number, bio: string) => {
  try {
    const { data, error } = await apiClient
      .from("User")
      .update({ bio })
      .eq("id", userId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as IUserDto;
  } catch (error) {
    console.error("patchBioByUserId", error);
    return undefined;
  }
};
