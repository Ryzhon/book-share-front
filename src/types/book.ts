export type Tag = {
  id: number;
  name: string;
};
export type Genre = {
  id: number;
  name: string;
};
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
