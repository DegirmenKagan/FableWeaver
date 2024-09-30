import { Link } from "react-router-dom";

type Props = {
  to: string;
  text?: string;
};

const CustomLink = (props: Props) => {
  const lowerCasedPage = props.to.toLowerCase();
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/${lowerCasedPage === "home" ? "" : lowerCasedPage}`}
    >
      {props.text ?? props.to}
    </Link>
  );
};

export default CustomLink;
