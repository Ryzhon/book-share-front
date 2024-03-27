import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";

import AddBookForm from "@/components/AddBookForm";

import { Book, AddBookFormProps } from "@/types/Book";
import { fetchGoogleBookByISBN } from "@/services/googleBooksService";

const BookDetailPage = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [addMode, setAddMode] = useState(false);
  const router = useRouter();
  const { isbn } = router.query;

  useEffect(() => {
    if (!isbn) return;
    const fetchAndSetBookData = async () => {
      const newData = await fetchGoogleBookByISBN(isbn as string);
      if (newData) {
        setBook(newData);
      }
    };
    fetchAndSetBookData();
  }, [isbn]);
  const onSave = async (bookData: AddBookFormProps) => {
    const accessToken = localStorage.getItem("access_token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (accessToken) {
      headers.append("ACCESS_TOKEN", accessToken);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(bookData),
        },
      );

      if (!response.ok) {
        throw new Error("社内蔵書の追加に失敗しました");
      }

      router.push("/books");
    } catch (error) {
      console.error("Error adding book to internal library:", error);
    }
  };

  if (isbn === "noIsbn") {
    return <Typography>詳細を取得することができませんでした。</Typography>;
  }
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
              {addMode ? (
                <AddBookForm book={book} onSave={onSave} />
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
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {book.summary}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setAddMode(true)}
                  >
                    社内蔵書に追加
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

export default BookDetailPage;
