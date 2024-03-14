import { useRouter } from 'next/router';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import Image from 'next/image';

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // 仮の本のデータ
  const book = {
    title: 'サンプル本のタイトル',
    author: 'サンプル著者',
    summary: 'ここに本の説明文が入ります。ここに本の説明文が入ります。ここに本の説明文が入ります。',
    imageUrl: 'http://books.google.com/books/content?id=Bdh_RQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  };

  return (
    <Container sx={{ mt: 4 }}> {/* コンテナーの上部にマージンを追加 */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '80%', height: '80%', position: 'relative', mx: 'auto' }}> {/* 画像のサイズと中央配置を設定 */}
            <Image src={book.imageUrl} alt={book.title} layout="responsive" width={200} height={200} objectFit="contain" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: '20px' }}>
              著者: {book.author}
            </Typography>
            <Typography variant="body1">
              {book.summary}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
