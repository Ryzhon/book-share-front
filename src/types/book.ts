import React from "react";
import { Genre } from "./Genre";
import { Tag } from "./Tag";

export type Book = {
  id: number;
  title: string;
  author: string;
  summary: string;
  genre_id: number;
  status: string;
  isbn: string;
  image_url: string;
  genre: Genre;
  tags: Tag[];
  created_at?: string;
};

export type AddBookFromProps = {
  isbn: string;
  title: string;
  author: string;
  summary: string;
  image_url: string;
  genre_id: number | null;
  tag_ids: number[];
};

export type EditBookFormProps = {
  book: Book;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};
