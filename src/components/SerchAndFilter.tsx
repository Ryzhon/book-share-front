import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBox from "@/components/SearchBox";
import GenreSelect from "@/components/GenreSelect";
import TagSelect from "@/components/TagSelect";
import { SearchAndFilterProps } from "@/types/Search";

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <Box>
      <SearchBox searchTerm={searchTerm} onChange={setSearchTerm} />
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 3 }}>
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

export default SearchAndFilter;
