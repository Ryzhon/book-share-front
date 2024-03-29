import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { EditBookFormProps } from "@/types/Book";

const BookEditForm: React.FC<EditBookFormProps> = ({
  book,
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
