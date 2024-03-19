import React from "react";
import { Box, Typography } from "@mui/material";
import GenreSelect from "@/components/GenreSelect";
import TagSelect from "@/components/TagSelect";
import { TagAndGenreFilterProps } from "@/types/Search";

const TagAndGenreFilter: React.FC<TagAndGenreFilterProps> = ({
  selectedGenre,
  setSelectedGenre,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        絞り込む
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          ジャンル
        </Typography>
        <GenreSelect
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          タグ
        </Typography>
        <TagSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>
    </Box>
  );
};

export default TagAndGenreFilter;
