import { Book, BookTopGenre } from "../types/types";
import { apiClient } from "../utils/supabase";

export type IBookInfoDto = {
  id: number;
  createdAt: Date;
  image: string;
  title: string;
  description: string;
  author: string;
  genreid?: number;
  genrename?: string;
};

export type IBookView = Book & {
  favoriteuserid?: number; // hepsini kucuk harf gonderiyor api
  genrename?: string;
};

export const getBooks = async (profileId: number) => {
  try {
    //inner join BookFavorite on Book.id = BookFavorite.bookId
    const { data, error } = await apiClient
      .from("book_view")
      // .select();
      .select();

    if (error) {
      throw error;
    }
    let responseData: IBookView[] = data as IBookView[];
    responseData = responseData.filter((item) =>
      item.favoriteuserid ? item.favoriteuserid === profileId : true
    );
    responseData.forEach((item) => {
      item.favorite = item.favoriteuserid ? true : false;
    });
    const user = responseData as Book[];
    console.log("getBooks", user);
    return user;
  } catch (error) {
    console.error("getBooks", error);
    return null;
  }
};

export const getBook = async (id: number) => {
  try {
    const { data, error } = await apiClient
      .from("book_view")
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

export const getTopBooksByGenre = async () => {
  try {
    const { data, error } = await apiClient.from("book_top_view").select("*");
    // .eq("genreid", genreId);
    if (error) {
      throw error;
    }
    console.log("getTopBooksByGenre", data);
    const bookChapter = data as BookTopGenre[];
    return bookChapter;
  } catch (error) {
    console.error("getTopBooksByGenre", error);
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
