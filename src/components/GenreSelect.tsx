import { useState, useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { Genre, GenreSelectProps } from "@/types/Genre";

const GenreSelect: React.FC<GenreSelectProps> = ({
  selectedGenre,
  setSelectedGenre,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:5000/genres");
      const data = await response.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId: number) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreId);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          clickable
          onClick={() => handleGenreClick(genre.id)}
          color={selectedGenre === genre.id ? "primary" : "default"}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default GenreSelect;
