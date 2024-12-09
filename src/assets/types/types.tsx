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

export type BookChapter = {
  id: number;
  createdAt?: Date;
  bookId: number;
  title: string;
  content: string;
  chapterId: number;
};

export type Book = {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  rating?: number;
  favorite: boolean;
  chapters: BookChapter[];
};

export type BookFavorite = {
  id: number;
  bookId: number;
  userId: number;
};

export type BookRating = {
  id?: number;
  bookId: number;
  userId: number;
  rating: number;
};

export type IComment = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  text: string;
  bookId: number;
  userId?: number;
};

export type ICommentDto = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  bookId: number;
  userId?: number;
  username: string;
  text: string;
  avatar?: string;
};
