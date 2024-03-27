import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";

import { Book, AddBookFormProps } from "@/types/Book";
import { fetchGoogleBookByISBN } from "@/services/googleBooksService";

const BookDetailPage = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [isAdded, setIsAdded] = useState(false);
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

  const addToInternalLibrary = async () => {
    if (!book) return;

    const bookData: AddBookFormProps = {
      title: book.title,
      author: book.author,
      summary: book.summary,
      status: "貸出可能",
      image_url: book.image_url as string,
      isbn: isbn as string,
    };

    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book: bookData }),
      });

      if (!response.ok) {
        throw new Error("社内蔵書の追加に失敗しました");
      }

      setIsAdded(true);
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
                  sx={{ mt: 2 }}
                  onClick={addToInternalLibrary}
                  disabled={isAdded}
                >
                  {isAdded ? "蔵書に追加済み" : "社内蔵書に追加"}
                </Button>
              </>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
