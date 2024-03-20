import React, { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Box, Button } from "@mui/material";
import { CompanyBooksSearchBoxProps } from "@/types/Search";

export const CompanyBooksSearchBox: React.FC<CompanyBooksSearchBoxProps> = ({
  searchTerm,
  onChange,
}) => {
  return (
    <Box my={4}>
      <TextField
        fullWidth
        label="社内検索"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export const GlobalSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/books/searchResults?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", mt: 2 }}
    >
      <TextField
        fullWidth
        label="全体検索"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">
        検索
      </Button>
    </Box>
  );
};
