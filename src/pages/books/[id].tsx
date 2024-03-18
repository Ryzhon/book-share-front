import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
} from "@mui/material";
import Image from "next/image";
import { Book } from "@/types/book";
import BookEditForm from "@/components/BookEditForm";
import FlashMessage from "@/components/FlashMessage";
import { FlashMessageType } from "@/types/flashMessageType";

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [flash, setFlash] = useState<FlashMessageType>({
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:5000/books/${id}`);
      const data = await response.json();
      setBook(data);
    };
    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!book) return;
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (book) {
      const updatedData = {
        ...book,
        genre_id: book.genre ? book.genre.id : null,
        tag_ids: book.tags ? book.tags.map((tag) => tag.id) : [],
      };

      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setBook(updatedBook);
        setEditMode(false);
        setFlash({ message: "更新が成功しました。", type: "success" });
      } else {
        setFlash({ message: "更新に失敗しました。", type: "error" });
      }
    } else {
      console.error("Book is null");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {flash.message && (
        <FlashMessage message={flash.message} type={flash.type} />
      )}
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
                  <Typography variant="body1">{book.summary}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(true)}
                    type="button"
                  >
                    編集
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
