import React from "react";
import { TextField, Box } from "@mui/material";
import { SearchBoxProps } from "@/types/Search";

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, onChange }) => {
  return (
    <Box my={4}>
      <TextField
        fullWidth
        label="検索"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default SearchBox;
