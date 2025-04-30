import { isValidISBN } from './utils/isValidISBN';
import { GoogleBooksResponse } from './utils/googleBooksTypes';

// Base URLs to fetch from
const GOOGLE_BOOKS = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

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
