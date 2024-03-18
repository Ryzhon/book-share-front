export type Genre = {
  id: number;
  name: string;
};

export type GenreSelectProps = {
  selectedGenre: number | null;
  setSelectedGenre: (value: number | null) => void;
};
