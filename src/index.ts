import { isValidISBN } from './utils/isValidISBN';
import { GoogleBooksResponse, OpenLibraryResponse } from './Types';

// Base URLs to fetch from
const GOOGLE_BOOKS = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const OPEN_LIBRARY = 'https://openlibrary.org/';

// Function to fetch book data from Google Books API
export async function fetchGoogleBooksData(
  query: number | string,
): Promise<GoogleBooksResponse> {
  // Check if the query is a valid ISBN
  if (!isValidISBN(query)) {
    throw new Error('This is not a valid ISBN');
  } else {
    const response = await fetch(`${GOOGLE_BOOKS}${query}`);
    // Check if the response is ok (status code 200), or if the book is not found
    if (!response.ok) {
      throw new Error('No book found with this ISBN');
    }
    const data = await response.json();
    // Check if the book is found
    if (data.totalItems === 0) throw new Error('No book found with this ISBN');

    return data.items[0].volumeInfo;
  }
}

export async function fetchOpenLibraryData(
  query: number | string,
): Promise<OpenLibraryResponse> {
  // Check if the query is a valid ISBN
  if (!isValidISBN(query)) {
    throw new Error('This is not a valid ISBN');
  } else {
    const response = await fetch(`${OPEN_LIBRARY}/isbn/${query}.json`);
    // Check if the response is ok (status code 200), or if the book is not found
    if (!response.ok) {
      throw new Error('No book found with this ISBN');
    }
    const rawData = await response.json();

    // Hit the Open Library API to get the author names, since they are not included in the response
    // The author names are in the form of an array of objects with a key property
    // We need to fetch each author by their key to get their name
    // The author key is in the form of /authors/{key}
    const authors = rawData.authors.map(async (author: { key: string }) => {
      const resolvedAuthor = await fetch(`${OPEN_LIBRARY}${author.key}.json`);
      const authorData = await resolvedAuthor.json();
      return authorData.name;
    });
    // Wait for all the author names to be fetched
    const authorNames = await Promise.all(authors);

    return {
      ...rawData,
      authors: authorNames,
      // The cover images are in the form of /b/isbn/{isbn}-S.jpg, /b/isbn/{isbn}-M.jpg, /b/isbn/{isbn}-L.jpg
      cover_imgs: [
        `https://covers.openlibrary.org/b/isbn/${query}-S.jpg`,
        `https://covers.openlibrary.org/b/isbn/${query}-M.jpg`,
        `https://covers.openlibrary.org/b/isbn/${query}-L.jpg`,
      ],
    };
  }
}
