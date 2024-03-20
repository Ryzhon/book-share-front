import { AddBookFromProps } from "@/types/Book";
import { BooksApiResponse } from "@/types/GoogleBook";

import { Book } from "@/types/Book";

export async function fetchGoogleBookByISBN(
  isbn: string,
  updateFormData: (data: Partial<AddBookFromProps>) => void,
): Promise<void> {
  if (isbn.length === 10 || isbn.length === 13) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const bookInfo = data.items[0].volumeInfo;
        updateFormData({
          title: bookInfo.title || "",
          author: bookInfo.authors ? bookInfo.authors.join(", ") : "",
          summary: bookInfo.description || "",
          image_url: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
        });
      }
    } catch (error) {
      console.error("Error fetching book info:", error);
    }
  }
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
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    const bookInfo = data.items[0].volumeInfo;
    return {
      id: data.items[0].id,
      title: bookInfo.title || "",
      author: bookInfo.authors ? bookInfo.authors.join(", ") : "",
      summary: bookInfo.description || "",
      image_url: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
    };
  }
  return null;
};
