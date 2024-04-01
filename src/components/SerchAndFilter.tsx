import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AddElementForm } from "./AddElementForm";
import GenreSelect from "@/components/GenreSelect";
import TagSelect from "@/components/TagSelect";
import { TagAndGenreFilterProps } from "@/types/Search";

const TagAndGenreFilter: React.FC<TagAndGenreFilterProps> = ({
  selectedGenre,
  setSelectedGenre,
  selectedTags,
  setSelectedTags,
}) => {
  const [genreAddMode, setGenreAddMode] = useState<boolean>(false);
  const [tagAddMode, setTagAddMode] = useState<boolean>(false);

  const [genreName, setGenreName] = useState<string>("");
  const [tagName, setTagName] = useState<string>("");

  const [error, setError] = useState<string>("");

  const handleGenreClick = () => {
    setGenreAddMode(!genreAddMode);
    setError("");
  };

  const handleTagClick = () => {
    setTagAddMode(!tagAddMode);
    setError("");
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        絞り込む
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" gap={0.5} mb={2}>
          <Typography variant="subtitle1">ジャンル</Typography>
          <IconButton onClick={handleGenreClick}>
            {genreAddMode ? (
              <RemoveCircleOutlineIcon />
            ) : (
              <AddCircleOutlineIcon />
            )}
          </IconButton>
        </Stack>
        {genreAddMode && (
          <AddElementForm
            elementName={genreName}
            setElementName={setGenreName}
            endpoint={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/genres`}
            elementAdded={() => {
              setGenreAddMode(false);
              setGenreName("");
              setError("");
            }}
            setError={setError}
            error={error}
          />
        )}
        <GenreSelect
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" gap={0.5} mb={2}>
          <Typography variant="subtitle1">タグ</Typography>
          <IconButton onClick={handleTagClick}>
            {tagAddMode ? (
              <RemoveCircleOutlineIcon />
            ) : (
              <AddCircleOutlineIcon />
            )}
          </IconButton>
        </Stack>
        {tagAddMode && (
          <AddElementForm
            elementName={tagName}
            setElementName={setTagName}
            endpoint={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tags`}
            elementAdded={() => {
              setTagAddMode(false);
              setTagName("");
            }}
            setError={setError}
            error={error}
          />
        )}
        <TagSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>
    </Box>
  );
};

export default TagAndGenreFilter;
