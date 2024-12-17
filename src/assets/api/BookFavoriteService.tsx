import { BookFavorite } from "../types/types";
import { apiClient } from "../utils/supabase";

// export const getBookRatingsByBookId = async (bookId: number) => {
//   try {
//     const { data, error } = await apiClient
//       .from("BookRating")
//       .select()
//       .eq("bookId", bookId);
//     if (error) {
//       throw error;
//     }
//     console.log("getRatingsByBookId", data);
//     const user = data as BookRating[];
//     return user;
//   } catch (error) {
//     console.error("getRatingsByBookId", error);
//     return null;
//   }
// };

// export const getBookRatingByBookId = async (bookId: number) => {
//   try {
//     const { data, error } = await apiClient
//       .from("BookRating")
//       .select("*")
//       .eq("bookId", bookId);
//     if (error) {
//       throw error;
//     }
//     const bookRatings = data as BookRating[];
//     let result = bookRatings.reduce((acc, rating) => {
//       return acc + rating.rating;
//     }, 0);
//     result = result / bookRatings.length;
//     return result;
//   } catch (error) {
//     console.error("getRatingByBookId", error);
//     return null;
//   }
// };

export const addBookFavorite = async (bookId: number, userId: number) => {
  const fav: BookFavorite = {
    bookId: bookId,
    userId: userId,
  };
  try {
    const { error } = await apiClient.from("BookFavorite").insert([fav]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("addBookFavorite", error);
    return null;
  }
};

export const deleteBookFavoriteByBookIdUserId = async (
  bookId: number,
  userId: number
) => {
  try {
    const { error } = await apiClient
      .from("BookFavorite")
      .delete()
      .eq("bookId", bookId)
      .eq("userId", userId);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("deleteBookFavorite", error);
    return null;
  }
};
