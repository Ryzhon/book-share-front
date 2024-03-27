import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
} from "@mui/material";

import BookEditForm from "@/components/BookEditForm";
import { useFlashMessageContext } from "@/contexts/FlashMessageContext";

import { Book } from "@/types/Book";

import { fetchBookJson } from "@/services/bookService";
import createAuthHeaders from "@/utils/authHeaders";

const BookDetail = () => {
  const router = useRouter();
  const { isbn } = router.query;
  const { setFlash } = useFlashMessageContext();

  const [book, setBook] = useState<Book | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isbn) return;
    const fetchBook = async () => {
      const book = await fetchBookJson(isbn as string);
      setBook(book);
    };
    try {
      fetchBook();
    } catch {
      setFlash({ message: "本の取得に失敗しました。", type: "error" });
    }
  }, [isbn, setFlash]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!book) return;
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!book) return <Typography>本の情報が見つかりません。</Typography>;
    e.preventDefault();

    const updatedData = {
      ...book,
      genre_id: book.genre ? book.genre.id : null,
      tag_ids: book.tags ? book.tags.map((tag) => tag.id) : [],
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${isbn}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );
      const updatedBook = await response.json();
      setBook(updatedBook);
      setEditMode(false);
      setFlash({ message: "本の更新に成功しました。", type: "success" });
    } catch (error) {
      setFlash({ message: "本の更新に失敗しました。", type: "error" });
    }
  };

  const handleDelete = async () => {
    const headers = createAuthHeaders();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books/${isbn}`,
        {
          method: "DELETE",
          headers: headers,
        },
      );
      console.log(response);
      setFlash({ message: "本の削除が成功しました。", type: "success" });
      router.push("/books");
    } catch (error) {
      setFlash({ message: "本の削除に失敗しました。", type: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {book && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "80%",
                height: "80%",
                position: "relative",
                mx: "auto",
              }}
            >
              {book.image_url && (
                <Image
                  src={book.image_url}
                  alt={book.title}
                  layout="responsive"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              {editMode ? (
                <BookEditForm
                  book={book}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditMode(false)}
                />
              ) : (
                <>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ marginBottom: "20px" }}
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
                    著者: {book.author}
                  </Typography>
                  {book.genre && (
                    <Box sx={{ display: "flex", mb: 1.5, gap: 0.5 }}>
                      <Chip
                        label={book.genre.name}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mb: 1.5,
                    }}
                  >
                    {book.tags?.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {book.summary}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(true)}
                    type="button"
                  >
                    編集
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    style={{ marginLeft: "8px" }}
                  >
                    削除
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetail;
