import React from "react";
import { BookChapter } from "../../types/types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

type Props = {
  chapters: BookChapter[];
  chapterStr: string;
  handleChapterChange: (event: SelectChangeEvent) => void;
  handleDescChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DirectionDialogItem = (props: Props) => {
  const { chapters, chapterStr, handleDescChange, handleChapterChange } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <FormControl sx={{ m: 1 }}>
          {/* Chapter 1 */}
          <InputLabel id="direction-simple-select-helper-label">
            Chapter
          </InputLabel>
          <Select
            labelId="direction-simple-select-helper-label"
            id="direction-simple-select-helper"
            value={chapterStr}
            label="Chapter"
            onChange={handleChapterChange}
            sx={{ width: 300 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {chapters.map((item) => (
              <MenuItem value={item.id}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: 1, marginInlineStart: 1 }}>
        {/* Desc 1 */}
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          onChange={handleDescChange}
          error={chapterStr !== ""}
          helperText={chapterStr !== "" ? "Description is required" : ""}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default DirectionDialogItem;
