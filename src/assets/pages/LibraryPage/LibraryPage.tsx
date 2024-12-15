import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate } from "react-router-dom";
import {
  handleSearch,
  handleViewChange,
  filteredBooks,
  toggleFavorite,
  openBook,
  editBook,
  deleteBook,
  handleNewBookClick,
  getLibraryBooks,
  readBook,
  handleGenreFilterClick,
  handleGenreFilterAllClick,
} from "./LibraryPage.functions";
import { Book, IGenre } from "../../types/types";
import { ProfileContext } from "../../contexts/ProfileContext";
import TextLookup, { ILookupItem } from "../../components/TextLookup";
import { doGetGenres } from "../BookPage/BookPage.functions";

const LibraryPage = () => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid"); // Toggle between 'list' and 'grid'
  const CARDHEIGHT = 205;

  const [genres, setGenres] = useState<IGenre[]>([]);
  const [genreLookup, setGenreLookup] = useState<ILookupItem[]>([]);
  const [genreIdFilter, setGenreIdFilter] = useState<number>(0);
  const [genreName, setGenreName] = useState<string>("Genre");

  useEffect(() => {
    if (genres.length > 0) {
      const tmpLookup: ILookupItem[] = [];
      const allOption: ILookupItem = {
        id: 0,
        name: "All",
        onClick: () =>
          handleGenreFilterAllClick(setGenreIdFilter, setGenreName),
      };
      tmpLookup.push(allOption);
      genres.forEach((x) => {
        const _lookupItem: ILookupItem = {
          id: x.id,
          name: x.name,
          onClick: () =>
            handleGenreFilterClick(
              x,
              genreIdFilter,
              setGenreIdFilter,
              setGenreName
            ),
          // onClick: () =>
          //   handleGenreFilterClick(book, x, setBook, setBooksGenreName), //genreName updateleniyor ama yazdırmıyor ekranda
        };
        tmpLookup.push(_lookupItem);
        setGenreLookup(tmpLookup);
      });
    }
  }, [genres]);

  useEffect(() => {
    if (books.length === 0) {
      getLibraryBooks(profile.id, setBooks);
      doGetGenres(setGenres);
    }
  }, [books]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Library
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        label="Search Books"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => handleSearch(e, setSearchQuery)}
        margin="normal"
      />

      {/* Toggle for Grid/List View */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, value) => handleViewChange(e, value, setView)}
        aria-label="view toggle"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="list" aria-label="list view">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="grid" aria-label="grid view">
          <ViewModuleIcon />
        </ToggleButton>
        <Box sx={{ display: "flex", alignItems: "center", marginInline: 2 }}>
          <TextLookup title={genreName} lookupItems={genreLookup} />
        </Box>
      </ToggleButtonGroup>

      {/* Flexbox layout for Grid/List */}
      <Box
        display="flex"
        flexDirection={view === "list" ? "column" : "row"}
        flexWrap="wrap"
        gap={2}
      >
        {filteredBooks(books, searchQuery, genreIdFilter).map((book) => (
          <Box
            key={book.id}
            width={
              view === "list" ? "100%" : { xs: "100%", sm: "48%", md: "31%" }
            }
            mb={2}
          >
            <Card
              sx={{ display: "flex", height: CARDHEIGHT }}
              variant="outlined"
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Author: {book.author}
                    </Typography>
                    {/* display genre as Button */}
                  </Box>
                  <Box>
                    {book.genrename ? (
                      <Button
                        id="basic-button"
                        variant="contained"
                        size="small"
                        sx={{ paddingBlock: 0.5 }}
                        // onClick={handleFilterByGenre(book.genreId)}
                      >
                        {book.genrename}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Box>
                </CardContent>
                <CardActions>
                  {/* Favorite Button */}
                  <IconButton
                    onClick={() =>
                      toggleFavorite(book.id, profile.id, books, setBooks)
                    }
                  >
                    <FavoriteIcon
                      color={book.favorite ? "secondary" : "inherit"}
                    />
                  </IconButton>
                  {/* Open Button */}
                  <IconButton onClick={() => openBook(book.id, navigate)}>
                    <OpenInNewIcon />
                  </IconButton>
                  {/* Read Button */}
                  <IconButton onClick={() => readBook(book.id, navigate)}>
                    <AutoStoriesIcon />
                  </IconButton>
                  {/* Edit Button */}
                  <IconButton onClick={() => editBook(book.id, navigate)}>
                    <EditIcon />
                  </IconButton>
                  {/* Delete Button */}
                  <IconButton
                    onClick={() => deleteBook(book.id, books, setBooks)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
              <CardMedia
                component="img"
                sx={{
                  width: 140,
                  maxHeight: CARDHEIGHT,
                  objectFit: "contain",
                  alignSelf: "center",
                }}
                image={book.image}
                alt={book.title}
              />
            </Card>
          </Box>
        ))}
      </Box>

      {/* Add New Book Button (Optional) */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => handleNewBookClick(navigate)}
      >
        Add New Book
      </Button>
    </Box>
  );
};

export default LibraryPage;
