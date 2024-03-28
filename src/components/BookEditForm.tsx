import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { EditBookFormProps } from "@/types/Book";
import GenreSelect from "./GenreSelect";
import TagSelect from "./TagSelect";

const BookEditForm: React.FC<EditBookFormProps> = ({
  book,
  selectedGenre,
  setSelectedGenre,
  selectedTags,
  setSelectedTags,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ "& .MuiTextField-root": { mb: 2, width: "100%" } }}>
        <TextField
          fullWidth
          label="タイトル"
          name="title"
          value={book.title}
          onChange={onChange}
        />
        <TextField
          fullWidth
          label="著者"
          name="author"
          value={book.author}
          onChange={onChange}
        />
        <Box sx={{ mb: 2 }}>
          <Typography>ジャンル</Typography>
          <GenreSelect
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          ></GenreSelect>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>タグ</Typography>
          <TagSelect
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          ></TagSelect>
        </Box>
        <TextField
          fullWidth
          label="概要"
          name="summary"
          multiline
          rows={4}
          value={book.summary}
          onChange={onChange}
        />
        <Button variant="contained" color="primary" type="submit">
          更新
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
          style={{ marginLeft: "8px" }}
        >
          戻る
        </Button>
      </Box>
    </form>
  );
};

export default BookEditForm;
