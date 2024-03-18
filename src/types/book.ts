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
};

export type EditBookFormProps = {
  book: Book;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};
