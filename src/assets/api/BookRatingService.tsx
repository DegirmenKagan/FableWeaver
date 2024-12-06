import { BookRating } from "../types/types";
import { apiClient } from "../utils/supabase";

export const getBookRatingsByBookId = async (bookId: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookRating")
      .select()
      .eq("bookId", bookId);
    if (error) {
      throw error;
    }
    console.log("getRatingsByBookId", data);
    const user = data as BookRating[];
    return user;
  } catch (error) {
    console.error("getRatingsByBookId", error);
    return null;
  }
};

export const getBookRatingByBookId = async (bookId: number) => {
  try {
    const { data, error } = await apiClient
      .from("BookRating")
      .select("*")
      .eq("bookId", bookId);
    if (error) {
      throw error;
    }
    const bookRatings = data as BookRating[];
    let result = bookRatings.reduce((acc, rating) => {
      return acc + rating.rating;
    }, 0);
    result = result / bookRatings.length;
    return result;
  } catch (error) {
    console.error("getRatingByBookId", error);
    return null;
  }
};

export const addBookRating = async (rating: BookRating) => {
  try {
    const { error } = await apiClient.from("BookRating").insert([rating]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("addBookRating", error);
    return null;
  }
};
