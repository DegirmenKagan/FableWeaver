import { IGenre } from "../types/types";
import { apiClient } from "../utils/supabase";

export const getGenres = async () => {
  try {
    const { data, error } = await apiClient.from("Genre").select("*");

    if (error) {
      throw error;
    }
    const bookGenres = data as IGenre[];
    return bookGenres;
  } catch (error) {
    console.error("getGenres", error);
    return null;
  }
};

export const patchBookGenre = async (bookId: number, genreId: number) => {
  try {
    const { error } = await apiClient
      .from("Book")
      .update({ genreId: genreId })
      .eq("id", bookId);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("updateBookChapter", error);
    alert("Book genre couldn't updated");
    return null;
  }
};
