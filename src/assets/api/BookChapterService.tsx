import { BookChapter, IBookChapter } from "../types/types";
import { apiClient } from "../utils/supabase";

export const getBookChaptersByBookId = async (bookId: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookChapter")
      .select()
      .eq("bookId", bookId);
    if (error) {
      throw error;
    }
    console.log("getCommentsByBookId", data);
    const user = data as BookChapter[];
    return user;
  } catch (error) {
    console.error("getCommentsByBookId", error);
    return null;
  }
};

export const getBookChapterByChapterId = async (id: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookChapter")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    const bookChapter = data as BookChapter;
    return bookChapter;
  } catch (error) {
    console.error("getComment", error);
    return null;
  }
};

export const addBookChapter = async (chapter: IBookChapter) => {
  try {
    const { error } = await apiClient.from("BookChapter").insert([chapter]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("addBookChapter", error);
    return null;
  }
};

export const deleteBookChapter = async (id: number) => {
  try {
    const { error } = await apiClient.from("BookChapter").delete().eq("id", id);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("deleteBookChapter", error);
    return null;
  }
};

//update chapter
export const updateBookChapter = async (chapter: BookChapter) => {
  try {
    const { error } = await apiClient
      .from("BookChapter")
      .update(chapter)
      .eq("id", chapter.id);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("updateBookChapter", error);
    return null;
  }
};
