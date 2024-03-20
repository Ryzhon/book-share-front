import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Grid, Link } from "@mui/material";
import BookCard from "@/components/BookCard";
import { fetchGoogleBooksByQuery } from "@/services/googleBooksService";

import { Book } from "@/types/Book";

const SearchResultsPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      fetchGoogleBooksByQuery(query as string, setBooks);
    }
  }, [query]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={3} lg={3} xl={2}>
            <Link
              href={
                book.isbn
                  ? `/books/searchResults/${book.isbn}`
                  : `/books/searchResults/noIsbn`
              }
            >
              <BookCard book={book} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
