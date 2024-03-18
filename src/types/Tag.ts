export type Tag = {
  id: number;
  name: string;
};

export type TagSelectProps = {
  selectedTags: number[];
  setSelectedTags: (value: number[]) => void;
};
