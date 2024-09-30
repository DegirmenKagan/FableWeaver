import { DividerProps } from "@mui/material";
import { Link } from "react-router-dom";

type Props = DividerProps & {
  to: string;
  text?: string;
};

const CustomLink = (props: Props) => {
  const lowerCasedPage = props.to.toLowerCase();
  return (
    <div style={props.style}>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/${lowerCasedPage === "home" ? "" : lowerCasedPage}`}
      >
        {props.text ?? props.to}
      </Link>
    </div>
  );
};

export default CustomLink;
