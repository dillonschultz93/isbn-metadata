import { isValidISBN } from './utils/isValidISBN';
import { GoogleBooksResponse, OpenLibraryResponse } from './Types';

// Base URLs to fetch from
const GOOGLE_BOOKS = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const OPEN_LIBRARY = 'https://openlibrary.org/';

// Function to fetch book data from Google Books API
export async function fetchGoogleBooksData(
  query: number | string,
): Promise<GoogleBooksResponse> {
  if (!isValidISBN(query)) {
    throw new Error('This is not a valid ISBN');
  } else {
    const response = await fetch(`${GOOGLE_BOOKS}${query}`);
    if (!response.ok) {
      throw new Error('No book found with this ISBN');
    }
    const data = await response.json();
    if (data.totalItems === 0) throw new Error('No book found with this ISBN');

    return data.items[0].volumeInfo;
  }
}

export async function fetchOpenLibraryData(
  query: number | string,
): Promise<OpenLibraryResponse> {
  if (!isValidISBN(query)) {
    throw new Error('This is not a valid ISBN');
  } else {
    const response = await fetch(`${OPEN_LIBRARY}/isbn/${query}.json`);
    if (!response.ok) {
      throw new Error('No book found with this ISBN');
    }

    const rawData = await response.json();

    // Hit the Open Library API to get the author names
    const authors = rawData.authors.map(async (author: { key: string }) => {
      const resolvedAuthor = await fetch(`${OPEN_LIBRARY}${author.key}.json`);
      const authorData = await resolvedAuthor.json();
      return authorData.name;
    });
    const authorNames = await Promise.all(authors);

    return {
      ...rawData,
      authors: authorNames,
      cover_imgs: [
        `https://covers.openlibrary.org/b/isbn/${query}-S.jpg`,
        `https://covers.openlibrary.org/b/isbn/${query}-L.jpg`,
        `https://covers.openlibrary.org/b/isbn/${query}-M.jpg`,
      ],
    };
  }
}
