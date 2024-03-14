import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre_id: '',
    summary: '',
    status: '',
    isbn: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信時のデフォルトのページ再読み込みを防止
    try {
      const response = await fetch('http://localhost:5000/books', { // APIエンドポイント
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // フォームデータをJSON形式で送信
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const result = await response.json(); // レスポンスのJSONを解析
      console.log(result); // 結果をコンソールに表示
      alert('本が正常に追加されました'); // ユーザーへのフィードバック
      // 成功後、フォームをリセット
      setFormData({
        title: '',
        author: '',
        genre_id: '',
        summary: '',
        status: '',
        isbn: '',
      });
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('本の追加に失敗しました'); // ユーザーへのエラーフィードバック
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 4 }}>
        新しい本を追加
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ '& .MuiTextField-root': { mb: 2, width: '100%' } }}>
          <TextField label="タイトル" name="title" variant="outlined" value={formData.title} onChange={handleChange} />
          <TextField label="著者" name="author" variant="outlined" value={formData.author} onChange={handleChange} />
          <TextField label="ジャンルID" name="genre_id" type="number" variant="outlined" value={formData.genre_id} onChange={handleChange} />
          <TextField label="概要" name="summary" variant="outlined" multiline rows={4} value={formData.summary} onChange={handleChange} />
          <TextField label="状態" name="status" variant="outlined" value={formData.status} onChange={handleChange} />
          <TextField label="ISBN" name="isbn" variant="outlined" value={formData.isbn} onChange={handleChange} />
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            送信
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddBook;
