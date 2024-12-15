import {
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  bookId: number;
  image: string;
  title: string;
  author: string;
};

const CardSliderItem = (props: Props) => {
  const { bookId, image: img, title, author } = props;
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const handleImgClick = () => {
    setClicked(!clicked);
    console.log(`Image ${bookId} clicked`);
    navigate(`/book/${bookId}`);
  };

  return (
    <Card key={img} sx={{ maxHeight: 250 }}>
      <ImageListItem key={img}>
        <img
          srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${img}?w=248&fit=crop&auto=format`}
          alt={title}
          loading="lazy"
          style={{
            userSelect: "none", // Disable text/image selection
            pointerEvents: "none", // Disable any interactions (e.g., drag)
          }}
        />
        <ImageListItemBar
          title={title}
          subtitle={author}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title}`}
              onClick={handleImgClick}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </Card>
  );
};

export default CardSliderItem;
