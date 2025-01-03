export type ProfileError = {
  username?: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};
export type IBookChapter = Omit<BookChapter, "id">; // for inserting purposes

export type BookChapter = {
  id: number;
  createdAt?: Date;
  bookId: number;
  title: string;
  content: string;
  chapterId: number;
};

export type IBookDirection = Omit<BookDirection, "id">; // for inserting purposes

export type BookDirection = {
  id: number;
  bookId: number;
  chapterId: number;
  pathOneChapterId?: number;
  pathOneDesc?: string;
  pathTwoChapterId?: number;
  pathTwoDesc?: string;
};

export type Book = {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  rating?: number;
  favorite: boolean;
  genreId?: number;
  genrename?: string;
  chapters: BookChapter[];
  authorUserId?: number;
};

export type BookTopGenre = {
  id: number;
  image: string;
  title: string;
  author: string;
  genreid: number;
};

export type BookFavorite = {
  id?: number;
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
  id?: number;
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

export type IGenre = {
  id: number;
  name: string;
};

export type IUserAchievementDto = {
  id: number;
  userId: number;
  achievementId: number;
  genreid: number;
  name: string;
  rarityId: number;
  collectionId: number;
  description: string;
};
