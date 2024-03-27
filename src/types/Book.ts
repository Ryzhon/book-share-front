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
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};
