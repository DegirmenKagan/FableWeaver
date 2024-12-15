//genreContext
import React, { createContext } from "react";
import { IGenre } from "../types/types";

type GenreContextType = {
  genres: IGenre[];
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
};

export const GenreContext = createContext<GenreContextType>({
  genres: [],
  setGenres: () => {},
});

export const GenreProvider = ({ children }: { children: JSX.Element }) => {
  const empArr: IGenre[] = [];

  const [genres, setGenres] = React.useState<IGenre[]>(empArr);

  return (
    <GenreContext.Provider value={{ genres, setGenres }}>
      {children}
    </GenreContext.Provider>
  );
};
