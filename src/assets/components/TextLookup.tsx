import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";

export type ILookupItem = {
  id: number;
  name: string;
  onClick: () => Promise<void>;
};

type IProps = {
  title: string;
  lookupItems: ILookupItem[];
  readonly?: boolean;
};

const TextLookup = (props: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localTitle, setLocalTitle] = useState<string>(props.title);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (onClickFunc: () => void) => {
    onClickFunc();
    handleClose();
  };

  useEffect(() => {
    if (props.title) {
      console.log("titlechanged", props.title);
      setLocalTitle(props.title);
    }
  }, [props.title]);

  return (
    <div>
      <Button
        id="basic-button"
        // color="secondary"
        variant="contained"
        size="small"
        sx={{
          paddingBlock: 0.5,
          pointerEvents: props.readonly ? "none" : "auto",
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {localTitle}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.lookupItems?.map((item) => (
          <MenuItem key={item.id} onClick={() => handleItemClick(item.onClick)}>
            {item.name}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
};

export default TextLookup;
