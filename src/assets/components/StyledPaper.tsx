import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
// Styled paper for reading content
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: "400px",
  maxHeight: "600px",
  overflowY: "auto",
  fontSize: "1.2rem",
  lineHeight: "1.75",
  textAlign: "justify",
}));
