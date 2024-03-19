import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SortBooksComponentProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const SortBooksComponent: React.FC<SortBooksComponentProps> = ({
  sortOrder,
  setSortOrder,
}) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel id="sort-order-label">並べ替え</InputLabel>
      <Select
        labelId="sort-order-label"
        id="sort-order"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as string)}
        label="s"
      >
        <MenuItem value="asc">登録順(昇順)</MenuItem>
        <MenuItem value="desc">登録順(降順)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBooksComponent;
