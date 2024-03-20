import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Grid, Box, Stack } from "@mui/material";

import TagAndGenreFilter from "@/components/SerchAndFilter";
import { CompanyBooksSearchBox, GlobalSearchBox } from "@/components/SearchBox";
import SortBooksComponent from "@/components/SortBooks";
import BookCard from "@/components/BookCard";

import { Book } from "@/types/Book";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [companyBooksSearchTerm, setCompanyBooksSearchTerm] = useState("");

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
        (book.title
          .toLowerCase()
          .includes(companyBooksSearchTerm.toLowerCase()) ||
          book.author
            .toLowerCase()
            .includes(companyBooksSearchTerm.toLowerCase()) ||
          book.summary
            .toLowerCase()
            .includes(companyBooksSearchTerm.toLowerCase())),
    ),
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 2 }}>
        <GlobalSearchBox />
        <CompanyBooksSearchBox
          searchTerm={companyBooksSearchTerm}
          onChange={setCompanyBooksSearchTerm}
        />
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
              <BookCard book={book} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksPage;
