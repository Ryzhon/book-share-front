export type SearchBoxProps = {
  searchTerm: string;
  onChange: (newSearchTerm: string) => void;
};

export type SearchAndFilterProps = {
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
  selectedGenre: number | null;
  setSelectedGenre: (selectedGenre: number | null) => void;
  selectedTags: number[];
  setSelectedTags: (selectedTags: number[]) => void;
};
