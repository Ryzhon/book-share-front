import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Typography, Paper, Box, Grid } from "@mui/material";

import { Book } from "@/types/Book";

const BookDetailPage = () => {
  const [book, setBook] = useState<Book>();
  const router = useRouter();
  const { isbn } = router.query;

  useEffect(() => {
    if (!isbn) return;
    const fetchBookDetails = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const bookInfo = data.items[0].volumeInfo;
        setBook({
          id: bookInfo.id,
          title: bookInfo.title || "",
          author: bookInfo.authors ? bookInfo.authors.join(", ") : "",
          summary: bookInfo.description || "",
          image_url: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
        });
      }
    };
    fetchBookDetails();
  }, [isbn]);
  if (isbn == "noIsbn")
    return <Typography>詳細を取得することができませんでした。</Typography>;

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
              </>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
