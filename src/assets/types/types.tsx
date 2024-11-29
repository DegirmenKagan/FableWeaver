export type User = {
  id: number;
  createdAt: Date;
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
};

export type ProfileError = {
  username?: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};

export type Chapter = {
  id: number;
  title: string;
  content: string;
};

export type Book = {
  id: number;
  img: string;
  title: string;
  description: string;
  author: string;
  rating?: number;
  favorite: boolean;
  chapters: Chapter[];
};

export type BookFavorite = {
  id: number;
  bookId: number;
  userId: number;
};

export type BookRating = {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
};

export type Comment = {
  id: number;
  bookId: number;
  username: string;
  text: string;
  avatar: string;
};
