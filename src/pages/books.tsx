import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import SearchBox from '../components/SearchBox'; // 確認してください。パスが正しいかどうか
import Link from 'next/link';
import Image from 'next/image'; // もし画像を表示する場合に必要です

const BooksPage = () => {
  const [books, setBooks] = useState([]); // APIから取得した書籍データを保持
  const [searchTerm, setSearchTerm] = useState('');

  // コンポーネントがマウントされたときにAPIから書籍データを取得
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data); // 取得したデータを状態にセット
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
      <SearchBox searchTerm={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={2.4}> {/* 5列表示の近似値 */}
            <Link href={`/books/${book.id}`} passHref>
              <Card sx={{ cursor: 'pointer' }}> {/* カードをクリッカブルに */}
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
