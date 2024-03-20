import { Genre } from "@/types/Genre";
import { Tag } from "@/types/Tag";
import { Book } from "@/types/Book";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

async function fetchAPIJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_ENDPOINT}/${path}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export const fetchGenresJson = (): Promise<Genre[]> =>
  fetchAPIJson<Genre[]>("genres");
export const fetchTagsJson = (): Promise<Tag[]> => fetchAPIJson<Tag[]>("tags");
export const fetchBooksJson = (): Promise<Book[]> =>
  fetchAPIJson<Book[]>("books");
export const fetchBookJson = (id: string): Promise<Book> =>
  fetchAPIJson<Book>(`books/${id}`);
