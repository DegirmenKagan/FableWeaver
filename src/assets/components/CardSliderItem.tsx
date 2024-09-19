import {
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  img: string;
  title: string;
  author: string;
};

const CardSliderItem = (props: Props) => {
  const { img, title, author } = props;
  return (
    <Card key={img} sx={{ maxHeight: 250 }}>
      <ImageListItem key={img}>
        <img
          srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${img}?w=248&fit=crop&auto=format`}
          alt={title}
          loading="lazy"
        />
        <ImageListItemBar
          title={title}
          subtitle={author}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title}`}
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
