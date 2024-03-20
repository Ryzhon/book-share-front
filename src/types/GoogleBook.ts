export type GoogleBooksVolume = {
  id: number;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type?: string;
      identifier?: string;
    }>;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
};

export type BooksApiResponse = {
  kind: string;
  totalItems: number;
  items: GoogleBooksVolume[];
};
