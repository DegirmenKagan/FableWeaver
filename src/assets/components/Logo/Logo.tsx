import React from "react";
import logoPng from "../../icons/fableWeaverHDBG.png";
import "./Logo.css";

type Props = { size?: number };

const Logo = (props: Props) => {
  return (
    <div className="logoContainer">
      <img
        srcSet={`${logoPng}?w=164&h=164&fit=crop&auto=format&dpr=2 ${
          (props.size ?? 40) / 4
        }x`}
        src={`${logoPng}?w=164&h=164&fit=crop&auto=format`}
        alt={"Fable Weaver Logo"}
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
