export type CompanyBooksSearchBoxProps = {
  searchTerm: string;
  onChange: (newSearchTerm: string) => void;
};

export type TagAndGenreFilterProps = {
  selectedGenre: number | null;
  setSelectedGenre: (selectedGenre: number | null) => void;
  selectedTags: number[];
  setSelectedTags: (selectedTags: number[]) => void;
};
