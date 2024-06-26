import React from "react";
import { Genre } from "./Genre";
import { Tag } from "./Tag";

export type Book = {
  id?: number;
  title: string;
  author: string;
  summary: string;
  genre_id?: number | null;
  status?: string | null;
  isbn: string | null;
  image_url?: string | null;
  genre?: Genre | null;
  tags?: Tag[] | null;
  created_at?: string | null;
};
export type AddBookFormProps = Book & {
  tag_ids?: number[];
};

export type EditBookFormProps = {
  book: Book;
  selectedGenre: number | null;
  setSelectedGenre: (value: number | null) => void;
  selectedTags: number[];
  setSelectedTags: (value: number[]) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};

export type AddElementFormProps = {
  elementName: string;
  setElementName: React.Dispatch<React.SetStateAction<string>>;
  endpoint: string;
  elementAdded: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
};
