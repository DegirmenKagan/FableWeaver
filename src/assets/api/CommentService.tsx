import { IComment, ICommentDto } from "../types/types";
import { apiClient } from "../utils/supabase";

export const getCommentsByBookId = async (bookId: number) => {
  try {
    const { data, error } = await apiClient
      .from("Comment")
      .select()
      .eq("bookId", bookId);
    if (error) {
      throw error;
    }
    console.log("getCommentsByBookId", data);
    const user = data as ICommentDto[];
    return user;
  } catch (error) {
    console.error("getCommentsByBookId", error);
    return null;
  }
};

export const getComment = async (id: number) => {
  try {
    const { data, error } = await apiClient
      .from("Comment")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    const bookChapter = data as IComment;
    return bookChapter;
  } catch (error) {
    console.error("getComment", error);
    return null;
  }
};

export const addComment = async (comment: IComment) => {
  try {
    const { error } = await apiClient.from("Comment").insert([comment]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("addBookInfo", error);
    return null;
  }
};
