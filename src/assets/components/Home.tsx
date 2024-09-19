import CardSlider from "./CardSlider";
import { Stack } from "@mui/material";

// type Props = {};

const Home = () => {
  return (
    <Stack gap={5}>
      <CardSlider title="Sci-Fi" />
      <CardSlider title="Adventure" />
      <CardSlider title="Romance" />
    </Stack>
  );
};

export default Home;
