import { describe, expect, test } from '@jest/globals';
import { isValidISBN } from '../src/utils/isValidISBN';
import { fetchGoogleBooksData, fetchOpenLibraryData } from '../src/index';

describe('Testing the isValidISBN function', () => {
  test('Returns true for a valid ISBN-10 as a number', () => {
    expect(isValidISBN(9780143039976)).toBe(true);
  });

  test('Returns true for a valid ISBN-13 as a number', () => {
    expect(isValidISBN(9780374104092)).toBe(true);
  });

  test('Returns true for a valid ISBN-10 as a string', () => {
    expect(isValidISBN('9780143039976')).toBe(true);
  });

  test('Returns true for a valid ISBN-13 as a string', () => {
    expect(isValidISBN('9780374104092')).toBe(true);
  });

  test('Returns false for an invalid ISBN-10', () => {
    expect(isValidISBN(9780143039977)).toBe(false);
  });

  test('Returns false for an invalid ISBN-13', () => {
    expect(isValidISBN(9780374104093)).toBe(false);
  });
});

describe('Testing the fetchGoogleBooksData function', () => {
  test('Returns a book with a valid ISBN passed as a number', async () => {
    const data = await fetchGoogleBooksData(9780143039976);
    expect(data.title).toBe('We Have Always Lived in the Castle');
  });

  test('Returns a book with a valid ISBN passed as a string', async () => {
    const data = await fetchGoogleBooksData('9780374104092');
    expect(data.title).toBe('Annihilation');
  });

  test('Returns "City of Saints and Madmen" by Jeff VanderMeer', async () => {
    const data = await fetchGoogleBooksData('9780374538606');

    expect(data.title).toBe('City of Saints and Madmen');
    expect(data.authors[0]).toBe('Jeff VanderMeer');
  });

  test('Returns an error when an invalid ISBN is provided', async () => {
    await expect(fetchGoogleBooksData(1234567890)).rejects.toThrow(
      'This is not a valid ISBN',
    );
  });

  test('Returns an error when a valid ISBN is passed, but no book is found', async () => {
    await expect(fetchGoogleBooksData(9780063446137)).rejects.toThrow(
      'No book found with this ISBN',
    );
  });
});

describe('Testing the fetchOpenLibraryData function', () => {
  test('Returns a book with a valid ISBN passed as a number', async () => {
    const data = await fetchOpenLibraryData(9780062846907);
    expect(data.title).toBe('The Luminous Dead');
  });

  test('Returns a book with a valid ISBN passed as a string', async () => {
    const data = await fetchOpenLibraryData('9781101911815');
    expect(data.title).toBe('The Memory Police');
  });

  test('Returns "Sour Cherry" by Natalia Theodoridou', async () => {
    const data = await fetchOpenLibraryData('9781963108194');
    expect(data.title).toBe('Sour Cherry');
    expect(data.authors[0]).toBe('Natalia Theodoridou');
  });

  test('Returns an error when an valid ISBN is provided', async () => {
    await expect(fetchOpenLibraryData(1234567890)).rejects.toThrow(
      'This is not a valid ISBN',
    );
  });

  test('Returns an error when a valid ISBN is passed, but no book is found', async () => {
    await expect(fetchOpenLibraryData(9798662731349)).rejects.toThrow(
      'No book found with this ISBN',
    );
  });
});
