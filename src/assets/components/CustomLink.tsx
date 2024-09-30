import { Link } from "react-router-dom";

type Props = {
  to: string;
  text?: string;
};

const CustomLink = (props: Props) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/${props.to.toLowerCase()}`}
    >
      {props.text ?? props.to}
    </Link>
  );
};

export default CustomLink;
