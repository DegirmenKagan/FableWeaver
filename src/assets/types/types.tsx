export type Chapter = {
  id: number;
  title: string;
  content: string;
};

export type Book = {
  id: number;
  img: string;
  title: string;
  author: string;
  chapters: Chapter[];
};
