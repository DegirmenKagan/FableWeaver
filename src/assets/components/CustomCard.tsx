import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useTheme } from "@mui/material";

export default function CustomCard() {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.secondary.main }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          //"/static/images/cards/contemplative-reptile.jpg"
          image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
