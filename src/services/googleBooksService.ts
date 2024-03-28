import { AddBookFormProps } from "@/types/Book";
import { BooksApiResponse } from "@/types/GoogleBook";

import { Book } from "@/types/Book";

async function fetchBookDataByISBNFromGoogleBooks(
  isbn: string,
): Promise<BooksApiResponse> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchGoogleBookByISBN(
  isbn: string,
): Promise<AddBookFormProps | null> {
  const data = await fetchBookDataByISBNFromGoogleBooks(isbn);
  if (data && data.items && data.items.length > 0) {
    const bookInfo = data.items[0].volumeInfo;
    return {
      isbn: isbn,
      title: bookInfo.title || "",
      author: bookInfo.authors ? bookInfo.authors.join(", ") : "",
      summary: bookInfo.description || "",
      image_url: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
    };
  }
  return null;
}

export async function fetchGoogleBooksByQuery(
  query: string,
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
) {
  if (!query) return;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`;
  try {
    const response = await fetch(endpoint);
    const data: BooksApiResponse = await response.json();
    const booksData = data.items
      ? data.items.map((item) => {
          const { volumeInfo } = item;
          const isbnInfo = volumeInfo.industryIdentifiers?.find((identifier) =>
            identifier?.type?.includes("ISBN"),
          );
          const isbn = isbnInfo?.identifier || "";
          return {
            id: item.id,
            title: volumeInfo.title,
            author: volumeInfo.authors
              ? volumeInfo.authors.join(", ")
              : "不明な著者",
            summary: volumeInfo.description || "説明がありません",
            image_url: volumeInfo.imageLinks
              ? volumeInfo.imageLinks.thumbnail
              : "",
            isbn,
          };
        })
      : [];
    setBooks(booksData);
  } catch (error) {
    console.error("Error fetching books:", error);
    setBooks([]);
  }
}

export const fetchGoogleBookDetails = async (
  isbn: string,
): Promise<Book | null> => {
  const data = await fetchBookDataByISBNFromGoogleBooks(isbn);
  if (data.items && data.items.length > 0) {
    const bookInfo = data.items[0].volumeInfo;
    return {
      id: data.items[0].id,
      isbn: isbn,
      title: bookInfo.title || "",
      author: bookInfo.authors ? bookInfo.authors.join(", ") : "",
      summary: bookInfo.description || "",
      image_url: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
    };
  }
  return null;
};
