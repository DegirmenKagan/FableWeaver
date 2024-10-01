import { Card, ImageListItem, ImageListItemBar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  bookId: number;
  img: string;
  title: string;
  author: string;
};

const CardSliderItem = (props: Props) => {
  const { bookId, img, title, author } = props;
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const handleImgClick = () => {
    setClicked(!clicked);
    console.log(`Image ${bookId} clicked`);
    navigate(`/book/${bookId}`);
  };

  return (
    <Card key={img} sx={{ maxHeight: 250 }}>
      <ImageListItem key={img} onClick={handleImgClick}>
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
        <ImageListItemBar title={title} subtitle={author} />
      </ImageListItem>
    </Card>
  );
};

export default CardSliderItem;
