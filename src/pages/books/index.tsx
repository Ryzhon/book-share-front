import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";

import TagAndGenreFilter from "@/components/SerchAndFilter";
import SearchBox from "@/components/SearchBox";
import SortBooksComponent from "@/components/SortBooks";

import { Book } from "@/types/Book";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const sortBooks = (books: Book[]) => {
    return books.sort((book1, book2) => {
      const date1 = book1.created_at ? new Date(book1.created_at) : new Date();
      const date2 = book2.created_at ? new Date(book2.created_at) : new Date();

      if (sortOrder === "asc") {
        return date1.getTime() - date2.getTime();
      } else {
        return date2.getTime() - date1.getTime();
      }
    });
  };

  const filteredBooks = sortBooks(
    books.filter(
      (book) =>
        (selectedGenre === null || book.genre?.id === selectedGenre) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            book.tags?.map((t) => t.id).includes(tag),
          )) &&
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.summary.toLowerCase().includes(searchTerm.toLowerCase())),
    ),
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 2 }}>
        <SearchBox searchTerm={searchTerm} onChange={setSearchTerm} />
      </Box>
      <Stack
        direction={{ sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <TagAndGenreFilter
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <SortBooksComponent sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Stack>
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={3} lg={3} xl={2}>
            <Link href={`/books/${book.id}`} passHref>
              <Card
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {book.image_url && (
                  <Box
                    sx={{ width: "100%", height: 200, position: "relative" }}
                  >
                    <Image
                      src={book.image_url}
                      alt={book.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {book.author}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {book.genre && (
                      <Chip
                        key={book.genre.id}
                        label={book.genre.name}
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {book.tags?.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    mt={1}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {book.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksPage;
