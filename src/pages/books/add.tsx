import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchGoogleBookByISBN } from "@/services/googleBooksService";

import { Container, Typography, TextField, Button, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import TagSelect from "@/components/TagSelect";
import GenreSelect from "@/components/GenreSelect";
import { useFlashMessageContext } from "@/contexts/FlashMessageContext";
import { AddBookFormProps } from "@/types/Book";

import createAuthHeaders from "@/utils/authHeaders";

const AddBookPage = () => {
  const { setFlash } = useFlashMessageContext();

  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [formData, setFormData] = useState<AddBookFormProps>({
    isbn: "",
    title: "",
    author: "",
    summary: "",
    status: "貸出可能",
    image_url: "",
    genre_id: null,
    tag_ids: [],
  });

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      genre_id: selectedGenre,
      tag_ids: selectedTags,
    }));
  }, [selectedGenre, selectedTags]);

  useEffect(() => {
    if (!formData.isbn) return;
    const fetchAndSetBookData = async () => {
      const newData = await fetchGoogleBookByISBN(formData.isbn as string);
      if (newData) {
        setFormData((oldData) => ({ ...oldData, ...newData }));
      }
    };

    if (formData.isbn.length === 10 || formData.isbn.length === 13) {
      fetchAndSetBookData();
    }
  }, [formData.isbn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const headers = createAuthHeaders();
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      setFlash({ message: "本の作成が成功しました。", type: "success" });
      router.push("/books");
    } catch (error) {
      setFlash({ message: "本の作成が失敗しました。", type: "error" });
      router.push("/books");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 4 }}>
        新しい本を追加
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <InfoOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            ISBNを入力すると、タイトル、著者、概要、写真が自動的に入力されます。
          </Typography>
        </Box>
        <Box sx={{ ".MuiTextField-root": { mb: 2, width: "100%" } }}>
          <TextField
            label="isbn"
            name="isbn"
            variant="outlined"
            value={formData.isbn}
            onChange={handleChange}
          />
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

export default AddBookPage;
