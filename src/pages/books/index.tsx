import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import SearchBox from '@/components/SearchBox';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      console.log(data)
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <SearchBox searchTerm={searchTerm} onChange={(newSearchTerm: string) => setSearchTerm(newSearchTerm)} />
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={2.4}>
            <Link href={`/books/${book.id}`} passHref>
              <Card sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                {book.image_url && ( // 画像URLが存在する場合にのみImageコンポーネントをレンダリング
                  <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
                    <Image src={book.image_url} alt={book.title} layout="fill" objectFit="cover" />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2">
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
