import React from "react";

import Image from "next/image";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Book } from "@/types/Book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {book.image_url && (
        <Box sx={{ width: "100%", height: 200, position: "relative" }}>
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
  );
};

export default BookCard;
