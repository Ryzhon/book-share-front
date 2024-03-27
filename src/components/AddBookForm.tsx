import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import GenreSelect from "@/components/GenreSelect";
import TagSelect from "@/components/TagSelect";
import { Book } from "@/types/Book";

interface AddBookProps {
  book: Book;
  onSave: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookProps> = ({ book, onSave }) => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleSave = () => {
    const updatedBook = {
      ...book,
      genre_id: selectedGenre,
      tag_ids: selectedTags,
    };
    onSave(updatedBook);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        ジャンル、タグを選択する
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">ジャンル</Typography>
        <GenreSelect
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">タグ</Typography>
        <TagSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>
      <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
        追加
      </Button>
    </Container>
  );
};

export default AddBookForm;
