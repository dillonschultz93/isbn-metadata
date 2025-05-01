export type GoogleBooksResponse = {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description?: string;
  industryIdentifiers?: {
    type?: string;
    identifier?: string;
  }[];
  readingModes?: {
    text?: boolean;
    image?: boolean;
  };
  pageCount?: number;
  printType?: string;
  categories?: string[];
  maturityRating?: string;
  contentVersion?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
  ratingsCount?: number;
  averageRating?: number;
  allowAnonLogging?: boolean;
};
