import { AddBookFromProps } from "@/types/Book";

export async function fetchBookInfo(
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
