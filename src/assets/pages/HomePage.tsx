import CardSlider from "../components/CardSlider";
import { Container, Stack } from "@mui/material";

// type Props = {};

const HomePage = () => {
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

export default HomePage;
