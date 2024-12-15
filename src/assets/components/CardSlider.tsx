import ImageList from "@mui/material/ImageList";
import { Box, useTheme } from "@mui/material";
import CardSliderItem from "./CardSliderItem";
import { useEffect, useState } from "react";
import { BookTopGenre } from "../types/types";

type Props = {
  title: string;
  targetId: number;
  books: BookTopGenre[];
};

export default function CardSlider(props: Props) {
  const theme = useTheme();
  const [topGenreBooks, setTopGenreBooks] = useState<BookTopGenre[]>([]);

  // useEffect(() => {
  //   doGetTopBooksByGenre(setTopGenreBooks); //create a view and get top 10 books of the genre
  // }, []);

  useEffect(() => {
    const tmpBook = props.books.filter(
      (book) => book.genreid === props.targetId
    );
    if (tmpBook) {
      setTopGenreBooks(tmpBook);
    }
  }, [props.books]);

  return (
    <>
      {topGenreBooks.length === 0 ? (
        <></>
      ) : (
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.light,
            paddingInline: 3,
          }}
          borderRadius={5}
        >
          <h1>{props.title}</h1>
          <ImageList
            variant="masonry"
            sx={{
              width: "100%",
              height: 270,
              flexWrap: "nowrap",
              overflowX: "scroll",
            }}
            cols={4}
            rowHeight={250}
          >
            {topGenreBooks.map((item) => (
              <CardSliderItem
                key={item.image}
                bookId={item.id}
                image={item.image}
                title={item.title}
                author={item.author}
              />
            ))}
          </ImageList>
        </Box>
      )}
    </>
  );
}

// const itemData = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//     author: "@bkristastucchio",
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//     author: "@rollelflex_graphy726",
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//     author: "@helloimnik",
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     author: "@nolanissac",
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     author: "@hjrc33",
//   },
//   {
//     id: 6,
//     image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     author: "@arwinneil",
//   },
//   {
//     id: 7,
//     image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//     author: "@tjdragotta",
//   },
//   {
//     id: 8,
//     image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//     author: "@katie_wasserman",
//   },
//   {
//     id: 9,
//     image: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     author: "@silverdalex",
//   },
//   {
//     id: 10,
//     image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//     author: "@shelleypauls",
//   },
//   {
//     id: 11,
//     image: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//     author: "@peterlaster",
//   },
//   {
//     id: 12,
//     image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     author: "@southside_customs",
//   },
// ];
