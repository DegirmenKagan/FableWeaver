import { Book, BookChapter } from "../types/types";
import { apiClient } from "../utils/supabase";

export type IBookInfoDto = {
  id: number;
  createdAt: Date;
  image: string;
  title: string;
  description: string;
  author: string;
};

export const getBooks = async () => {
  try {
    console.log("getBooks", apiClient);
    const { data, error } = await apiClient.from("Book").select();
    if (error) {
      throw error;
    }
    console.log("getBooks", data);
    const user = data as Book[];
    return user;
  } catch (error) {
    console.error("getBooks", error);
    return null;
  }
};

export const getBook = async (id: number) => {
  try {
    const { data, error } = await apiClient
      .from("Book")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    const bookChapter = data as Book;
    return bookChapter;
  } catch (error) {
    console.error("getBook", error);
    return null;
  }
};

export const getBookInfos = async () => {
  try {
    const { data, error } = await apiClient.from("Book").select("*");
    if (error) {
      throw error;
    }
    const user = data as IBookInfoDto[];
    return user;
  } catch (error) {
    console.error("getBookInfos", error);
    return null;
  }
};

export const addBookInfo = async (book: IBookInfoDto) => {
  try {
    const { data, error } = await apiClient.from("Book").insert([book]);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("addBookInfo", error);
    return null;
  }
};
