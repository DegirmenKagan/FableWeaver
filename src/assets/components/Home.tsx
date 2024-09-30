import CardSlider from "./CardSlider";
import { Container, Stack } from "@mui/material";

// type Props = {};

const Home = () => {
  return (
    <Container>
      <Stack gap={5}>
        <CardSlider title="Sci-Fi" />
        <CardSlider title="Adventure" />
        <CardSlider title="Romance" />
      </Stack>
    </Container>
  );
};

export default Home;
