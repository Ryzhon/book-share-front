import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import TagSelect from "@/components/TagSelect";
import GenreSelect from "@/components/GenreSelect";

const AddBook = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    image_url: "",
    genre_id: null,
    tag_ids: [] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== "genre_id" && name !== "tag_ids") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      router.push("/books");
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("本の追加に失敗しました");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 4 }}>
        新しい本を追加
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ "& .MuiTextField-root": { mb: 2, width: "100%" } }}>
          <TextField
            label="タイトル"
            name="title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              ジャンル
            </Typography>
            <GenreSelect
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              タグ
            </Typography>
            <TagSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </Box>
          <TextField
            label="著者"
            name="author"
            variant="outlined"
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            label="概要"
            name="summary"
            variant="outlined"
            multiline
            rows={4}
            value={formData.summary}
            onChange={handleChange}
          />
          <TextField
            label="画像リンク"
            name="image_url"
            variant="outlined"
            value={formData.image_url}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            送信
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddBook;
