import { BookDirection, IBookDirection } from "../types/types";
import { apiClient } from "../utils/supabase";

export const getBookDirectionsByBookId = async (bookId: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookDirection")
      .select()
      .eq("bookId", bookId);
    if (error) {
      throw error;
    }
    console.log("getBookDirectionsByBookId", data);
    const user = data as BookDirection[];
    return user;
  } catch (error) {
    console.error("getBookDirectionsByBookId", error);
    return null;
  }
};

export const getBookDirectionByChapterId = async (chapterId: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookDirection")
      .select()
      .eq("chapterId", chapterId)
      .single();
    if (error) {
      throw error;
    }
    console.log("getBookDirectionByChapterId", data);
    const user = data as BookDirection;
    return user;
  } catch (error) {
    console.error("getBookDirectionByChapterId", error);
    return null;
  }
};

export const addBookDirection = async (Direction: IBookDirection) => {
  try {
    const { error } = await apiClient.from("BookDirection").insert([Direction]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("addBookDirection", error);
    return null;
  }
};

export const deleteBookDirection = async (id: number) => {
  try {
    const { error } = await apiClient
      .from("BookDirection")
      .delete()
      .eq("id", id);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("deleteBookDirection", error);
    return null;
  }
};

//update Direction
export const updateBookDirection = async (Direction: BookDirection) => {
  try {
    const { error } = await apiClient
      .from("BookDirection")
      .update(Direction)
      .eq("id", Direction.id);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("updateBookDirection", error);
    return null;
  }
};
