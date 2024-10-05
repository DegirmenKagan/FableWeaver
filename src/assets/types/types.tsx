export type Chapter = {
  id: number;
  title: string;
  content: string;
};

export type Book = {
  id: number;
  img: string;
  title: string;
  desc: string;
  author: string;
  rating?: number;
  favorite: boolean;
  chapters: Chapter[];
};
