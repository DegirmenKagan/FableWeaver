import { useContext, useEffect, useState } from "react";
import CardSlider from "../components/CardSlider";
import { Container, Stack } from "@mui/material";
import { GenreContext } from "../contexts/GenreContext";
import { doGetGenres } from "./BookPage/BookPage.functions";
import { doGetTopBooksByGenre } from "../components/ComponentFunctions";
import { BookTopGenre } from "../types/types";

// type Props = {};

const HomePage = () => {
  const { genres, setGenres } = useContext(GenreContext);
  const [books, setBooks] = useState<BookTopGenre[]>([]);

  useEffect(() => {
    doGetGenres(setGenres);
  }, []);

  useEffect(() => {
    doGetTopBooksByGenre(setBooks); //create a view and get top 10 books of the genre
  }, []);

  return (
    <Container>
      <Stack gap={5}>
        {genres.map((genre) => (
          <CardSlider
            key={genre.id}
            targetId={genre.id}
            title={genre.name}
            books={books}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default HomePage;
